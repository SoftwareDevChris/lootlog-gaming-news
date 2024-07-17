import bcrypt from "bcrypt";

const saltRounds = 15;

export async function hashPassword(password: string) {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  const isMatching = await bcrypt.compare(password, hashedPassword);
  return isMatching;
}
