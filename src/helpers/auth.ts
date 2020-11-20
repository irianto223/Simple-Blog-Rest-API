import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds: number = 10;

export const hashPassword = (plainPassword: string): string => {
  return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(saltRounds));
}

export const comparePassword = (plainPassword: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

export const createToken = (data: any, secret: string): string => {
  return jwt.sign(data, secret);
}

export const verifyToken = (token: string, secret: string): any => {
  try {
    const decoded: any = jwt.verify(token, secret);
    return decoded;
  } catch(err) {
    throw new Error(err);
  }
}
