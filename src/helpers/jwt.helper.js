import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constant.js"

export const signToken = (id) => {
  const secret = process.env.JWT_SECRET ?? JWT_SECRET

  var token = jwt.sign({
    id
  }, secret, {
    expiresIn: 36000
  });

  return token
}

export const verifytoken = (token) => {
  const secret = process.env.JWT_SECRET ?? JWT_SECRET

  console.log("secret", secret)
  console.log("token", token)

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
