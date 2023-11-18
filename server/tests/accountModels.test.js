const { login, register } = require('../models/accountModels');

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const client = require('../db');
const db = client.db('mock-db').collection('mock-collection');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

jest.mock('../db', () => ({
  connect: jest.fn(),
  db: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      insertOne: jest.fn(),
    }),
  }),
}));
jest.mock('uuid', () => ({ v4: jest.fn() }));

describe('Login function', () => {
  it('should return a token when valid credentials are provided', async () => {
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mocked-token');

    const token = await login('user_id', 'userPassword', 'dbPassword');

    expect(token).toBe('mocked-token');
  });

  it('should return undefined when invalid credentials are provided', async () => {
    bcrypt.compare.mockResolvedValue(false);

    const token = await login('user_id', 'userPassword', 'dbPassword');

    expect(token).toBeUndefined();
  });
});

describe('Register function', () => {
  it('should return a token', async () => {
    jwt.sign.mockReturnValue('mocked-token');

    const token = await register('name', 'username', 'password');

    expect(token).toBe('mocked-token');
  });

  it('should register a new user with the provided details and defaults', async () => {
    const spyInsertOne = jest.spyOn(db, 'insertOne');
    uuidv4.mockReturnValue('1234');
    bcrypt.hash.mockResolvedValue('hash123');
    jest.useFakeTimers({ now: 420 });

    const mockUserToAdd = {
      user_id: '1234',
      name: 'name',
      username: 'username',
      password: 'hash123',
      favourite_tea: 'None',
      brewing_time: 0,
      brewed_teas: [],
      teas_drunken: 0,
      badges: [
        {
          name: 'Tea Noob', 
          unlocked: true,
        },
        {
          name: 'Tea Hater', 
          unlocked: false,
        },
        {
          name: 'Tea Expert', 
          unlocked: false,
        },
        {
          name: 'Tea Lover', 
          unlocked: false,
        },
        {
          name: 'Tea Enthusiast',
          unlocked: false,
        },
      ],
      reviews: [],
      average_rating: 0,
      joined_at: 420,
    };

    await register('name', 'username', 'password');

    expect(spyInsertOne).toHaveBeenCalledWith(mockUserToAdd);
  });
});
