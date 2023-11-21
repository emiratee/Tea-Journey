// Import required modules and types
import Koa from 'koa';
import { Collection } from 'mongodb';
import { User } from '../../interfaces/User';
import * as models from '../models/accountModels';
import client from '../db';
import { tokenToUserId } from '../utils/util';

const db: Collection<User> = client.db('teajourney').collection('users');
const SECRET_KEY =
  'I love tea and I especially love my cat but I do not love it when my tea is cold';

async function login(ctx: any): Promise<void> {
  const { username, password } = ctx.request.body;
  if (!username || !password) throw new Error('Username or password missing');

  try {
    const user = await db.findOne({ username });
    if (!user) {
      ctx.status = 401;
      ctx.body = { status: 401, message: 'User does not exist' };
      return;
    }

    const token = await models.login(user.user_id, password, user.password);
    if (!token) {
      ctx.status = 401;
      ctx.body = { status: 401, message: 'Invalid password' };
      return;
    }

    ctx.status = 200;
    ctx.body = { status: 200, message: 'Success', token };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
    console.error(error);
  }
}

async function register(ctx: any) {
  const { name, username, password } = ctx.request.body;
  if (!name || !username || !password) throw new Error();
  try {
    const userWithUsername = await db.findOne({ username });
    if (userWithUsername) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        message: 'User with this username already exists',
      };
      return;
    }

    const token = await models.register(name, username, password);
    ctx.status = 201;
    ctx.body = { status: 201, message: 'Success', token };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
    console.log(error);
  }
}

async function getUser(ctx: any) {
  try {
    const { authorization } = ctx.headers;
    const user_id = tokenToUserId(authorization); //deleted second argument SECRET_KEY
    const user = await db.findOne({ user_id });
    if (!user) {
      ctx.status = 404;
      ctx.body = { status: 404, message: 'User not found' };
      return;
    }
    const user_info = await models.getUser(user);
    ctx.status = 200;
    ctx.body = { status: 200, user_info };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
    console.log(error);
  }
}

async function changeCounter(ctx: any) {
  try {
    if (!ctx.request.body) return new Error();
    const { authorization } = ctx.headers;
    const { direction } = ctx.params;
    const user_id = tokenToUserId(authorization);
    const result = await models.changeCounter(direction, user_id);
    ctx.status = 200;
    ctx.body = { status: 200, result };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
    console.log(error);
  }
}

async function addTea(ctx: any) {
  try {
    const { name } = ctx.request.body;
    const { authorization } = ctx.headers;
    const user_id = tokenToUserId(authorization);
    const result = await models.addTea(name, user_id);
    ctx.status = 200;
    ctx.body = { status: 200, result };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
    console.log(error);
  }
}

async function addBrewTime(ctx: any) {
  try {
    const { authorization } = ctx.headers;
    const { time } = ctx.request.body;
    const user_id = tokenToUserId(authorization);
    const result = await models.addBrewTime(time, user_id);
    ctx.status = 200;
    ctx.body = { status: 200, result };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
    console.log(error);
  }
}

async function markAsFavourite(ctx: any) {
  try {
    const { authorization } = ctx.headers;
    const { name } = ctx.request.body;
    const user_id = tokenToUserId(authorization);
    const result = await models.markAsFavourite(name, user_id);
    ctx.status = 200;
    ctx.body = { status: 200, result };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
    console.log(error);
  }
}

async function rateTea(ctx: any) {
  try {
    const { authorization } = ctx.headers;
    const { name, rating } = ctx.request.body;
    const user_id = tokenToUserId(authorization);
    const result = await models.rateTea(name, rating, user_id);
    ctx.status = 200;
    ctx.body = { status: 200, result };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
    console.log(error);
  }
}

async function resetJourney(ctx: any) {
  try {
    const { authorization } = ctx.headers;
    const user_id = tokenToUserId(authorization);
    const result = await models.resetJourney(user_id);
    ctx.status = 200;
    ctx.body = { status: 200, result };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
    console.log(error);
  }
}

async function updateUser(ctx: any) {
  try {
    const { authorization } = ctx.headers;
    const { name, username, password } = ctx.request.body;
    const user = await db.findOne({ username });
    if (user) {
      ctx.status = 401;
      ctx.body = { status: 401, message: 'User already exists' };
      return;
    }
    const user_id = tokenToUserId(authorization);
    const thisUser = await db.findOne({ user_id });
    const result = await models.updateUser({
      name: name === '' ? thisUser.name : name,
      username: username === '' ? thisUser.username : username,
      password: password === '' ? thisUser.password : password,
      user_id,
    });
    ctx.status = 200;
    ctx.body = { status: 200, result };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
    console.log(error);
  }
}

export {
  login,
  register,
  changeCounter,
  getUser,
  addTea,
  addBrewTime,
  markAsFavourite,
  rateTea,
  resetJourney,
  updateUser,
};
