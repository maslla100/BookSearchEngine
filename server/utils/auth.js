const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiration = '2h';

const authMiddleware = (context) => {
  let token = context.req.body.token || context.req.query.token || context.req.headers.authorization;

  if (context.req.headers.authorization) {
    token = token
      .split(' ')
      .pop()
      .trim();
  }

  if (!token) {
    return context;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    context.user = data;
  } catch {
    console.log('Invalid token');
  }

  return context;
};


