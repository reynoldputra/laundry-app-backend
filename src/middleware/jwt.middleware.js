import { verifytoken } from '../helpers/jwt.helper.js';

export const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  const extractToken = token.split(" ")

  if (extractToken[0] != "Bearer" && extractToken[1]) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  console.log(extractToken)

  try {
    const decoded = verifytoken(extractToken[1]);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: 'Invalid token' });
  }
};

