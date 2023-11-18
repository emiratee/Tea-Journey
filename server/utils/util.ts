import jwt from 'jsonwebtoken';

const SECRET_KEY =
  'I love tea and I especially love my cat but I do not love it when my tea is cold';

function tokenToUserId(token: string): string {
  return (jwt.verify(token, SECRET_KEY) as { user_id: string }).user_id;
}

export { tokenToUserId };
