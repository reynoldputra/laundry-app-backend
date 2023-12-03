import * as passwordHash from "password-hash"

export const hashPassword = async (str, salt = 10) => {
  return passwordHash.generate(str, {
    saltLength: salt
  })
};

export const comparePassword = (
  str,
  str2,
) => {
  return passwordHash.verify(str, str2);
};

