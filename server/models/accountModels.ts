import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import client from '../db';
import { Collection, Document } from 'mongodb';
import { User } from '../../interfaces/User'; // You should create a 'types' file with the User type

const db: Collection<User> = client.db('teajourney').collection('users');
const SECRET_KEY =
  'I love tea and I especially love my cat but I do not love it when my tea is cold';

async function login(
  user_id: string,
  userPassword: string,
  dbPassword: string
): Promise<string | undefined> {
  await client.connect();

  const validPassword: boolean = await bcrypt.compare(userPassword, dbPassword);
  if (!validPassword) return;

  const token: string = jwt.sign({ user_id }, SECRET_KEY);
  return token;
}

async function register(
  name: string,
  username: string,
  password: string
): Promise<string> {
  await client.connect();
  const user_id: string = uuidv4();

  const user: User = {
    user_id,
    name,
    username,
    password: await bcrypt.hash(password, 10),
    favourite_tea: 'None',
    brewing_time: 0,
    brewed_teas: [],
    teas_drunken: 0,
    badges: [
      {
        name: 'Tea Noob', // When having 0 reviews
        unlocked: true,
      },
      {
        name: 'Tea Hater', // When having an average rating below 2
        unlocked: false,
      },
      {
        name: 'Tea Expert', // When having more than 10 reviews
        unlocked: false,
      },
      {
        name: 'Tea Lover', // When having at least one 10-star review
        unlocked: false,
      },
      {
        name: 'Tea Enthusiast', // When having the max amount of reviews
        unlocked: false,
      },
    ],
    reviews: [],
    average_rating: 0,
    joined_at: Date.now(),
  };
  await db.insertOne(user);
  const token: string = jwt.sign({ user_id }, SECRET_KEY);
  return token;
}

async function getUser(user: User): Promise<Partial<User>> {
  const {
    name,
    username,
    favourite_tea,
    brewing_time,
    brewed_teas,
    teas_drunken,
    badges,
    reviews,
    average_rating,
    joined_at,
  } = user;
  return {
    name,
    username,
    favourite_tea,
    brewing_time,
    brewed_teas,
    teas_drunken,
    badges,
    reviews,
    average_rating,
    joined_at,
  };
}

async function changeCounter(
  direction: 'up' | 'down',
  user_id: string
): Promise<Document | null> {
  await client.connect();
  const res: Document | null =
    direction === 'up'
      ? await db.findOneAndUpdate(
          { user_id: user_id },
          { $inc: { teas_drunken: +1 } },
          { returnDocument: 'after' }
        )
      : await db.updateOne(
          { user_id },
          { $inc: { teas_drunken: -1 } }
          //   { returnDocument: 'after' }
        );
  return res;
}

async function addTea(name: string, user_id: string): Promise<void> {
  const user = await db.findOne({ user_id });

  const existingTeaIndex: number = user.brewed_teas.findIndex(
    (t) => t.name === name
  );

  if (existingTeaIndex === -1) {
    await db.findOneAndUpdate(
      { user_id },
      { $push: { brewed_teas: { name, score: 1 } } }
    );
  } else {
    await db.findOneAndUpdate(
      { user_id, 'brewed_teas.name': name },
      { $inc: { 'brewed_teas.$.score': 1 } }
    );
  }
}

async function addBrewTime(time: number, user_id: string): Promise<void> {
  await db.updateOne({ user_id }, { $inc: { brewing_time: time } });
}

async function markAsFavourite(name: string, user_id: string): Promise<void> {
  await db.updateOne({ user_id }, { $set: { favourite_tea: name } });
}

async function rateTea(
  name: string,
  rating: number,
  user_id: string
): Promise<any> {
  const user = await db.findOne({ user_id });

  const existingTeaIndex: number = user.reviews.findIndex(
    (t) => t.name === name
  );

  if (existingTeaIndex === -1) {
    await db.findOneAndUpdate(
      { user_id },
      { $push: { reviews: { name, score: rating } } }
    );
  } else {
    await db.findOneAndUpdate(
      { user_id, 'reviews.name': name },
      { $set: { 'reviews.$.score': rating } }
    );
  }

  const updatedUser = await db.findOne({ user_id });
  const reviews = updatedUser.reviews;

  let res = 0;
  await reviews.forEach((review) => (res += review.score));
  let avg = res / reviews.length;

  await db.updateOne({ user_id }, { $set: { average_rating: avg } });

  const isTeaNoob = reviews.length === 0;
  await db.updateOne(
    { user_id, 'badges.name': 'Tea Noob' },
    { $set: { 'badges.$.unlocked': isTeaNoob } }
  );

  const isTeaHater = avg < 2;
  await db.updateOne(
    { user_id, 'badges.name': 'Tea Hater' },
    { $set: { 'badges.$.unlocked': isTeaHater } }
  );

  const isTeaExpert = reviews.length >= 10;
  await db.updateOne(
    { user_id, 'badges.name': 'Tea Expert' },
    { $set: { 'badges.$.unlocked': isTeaExpert } }
  );

  const isTeaLover = reviews.some((review) => review.score === 10);
  await db.updateOne(
    { user_id, 'badges.name': 'Tea Lover' },
    { $set: { 'badges.$.unlocked': isTeaLover } }
  );

  const isTeaEnthusiast = reviews.length === 42;
  await db.updateOne(
    { user_id, 'badges.name': 'Tea Enthusiast' },
    { $set: { 'badges.$.unlocked': isTeaEnthusiast } }
  );

  const returnUser = await db.findOne({ user_id }); //for the badges live update
  return returnUser.badges;
}

async function resetJourney(user_id: string): Promise<any> {
  const result = await db.updateOne(
    { user_id },
    {
      $set: {
        favourite_tea: 'None',
        brewing_time: 0,
        brewed_teas: [],
        teas_drunken: 0,
        badges: [
          {
            name: 'Tea Noob', // When having 0 reviews
            unlocked: true,
          },
          {
            name: 'Tea Hater', // When having an average rating below 2
            unlocked: false,
          },
          {
            name: 'Tea Expert', // When having more than 10 reviews
            unlocked: false,
          },
          {
            name: 'Tea Lover', // When having at least one 10-star review
            unlocked: false,
          },
          {
            name: 'Tea Enthusiast', // When having the max amount of reviews
            unlocked: false,
          },
        ],
        reviews: [],
        average_rating: 0,
        joined_at: Date.now(),
      },
    }
  );

  return result;
}

async function updateUser(data: Partial<User>): Promise<Document | null> {
  const { name, username, password, user_id } = data;
  const newPassword: string = await bcrypt.hash(password, 10);

  return await db.findOneAndUpdate(
    { user_id },
    { $set: { name, username, password: newPassword } },
    { returnDocument: 'after' }
  );
}

export {
  login,
  register,
  getUser,
  changeCounter,
  addTea,
  addBrewTime,
  markAsFavourite,
  rateTea,
  resetJourney,
  updateUser,
};
