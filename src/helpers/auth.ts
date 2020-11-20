import bcrypt from 'bcrypt';

const saltRounds: number = 10;

export const hashPassword = (plainPassword: string): string => {
  return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(saltRounds));
}
