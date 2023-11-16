const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login } = require('../models/accountModels');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../db', () => ({
  connect: jest.fn(), 
  db: jest.fn().mockReturnValueOnce({collection: jest.fn().mockReturnValueOnce()})
}));

describe('Login function', () => {
  it('should return a token when valid credentials are provided', async () => {
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mocked-token');
    
    const token = await login('user_id', 'userPassword', 'dbPassword');
    
    expect(token).toBe('mocked-token');
  });
  
  it('should return undefined when invalid credentials are provided', async ()=> {
    bcrypt.compare.mockResolvedValue(false);

    const token = await login('user_id', 'userPassword', 'dbPassword');

    expect(token).toBeUndefined();
  })
})