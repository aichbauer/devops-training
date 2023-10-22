import bcrypt from 'bcryptjs';

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const hash = await bcrypt.hash(plainPassword, 10);

  return hash;
};

export const isValidPassword = async (plainPassword: string, hash: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(plainPassword, hash);

  return isValid;
};
