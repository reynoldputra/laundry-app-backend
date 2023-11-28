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
