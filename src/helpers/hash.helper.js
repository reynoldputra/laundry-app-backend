import * as bcrypt from 'bcrypt';

export const hashPassword = async (str, salt = 10) => {
  return await bcrypt.hash(str, salt);
};

export const comparePassword = async (
  str,
  str2,
) => {
  return await bcrypt.compare(str, str2);
};

