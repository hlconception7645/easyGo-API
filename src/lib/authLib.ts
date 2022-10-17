import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

/**
 * Hash a new password.
 *
 * @param plainPswd
 * @returns
 */
export const hashPassword = async (plainPswd: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(plainPswd, salt);

  return hash;
};

/**
 * Check if password is correct.
 *
 * @param plainPswd
 * @param hashedPswd
 * @returns
 */
export const verifyPassword = async (
  plainPswd: string,
  hashedPswd: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPswd, hashedPswd);
};

/**
 * Encode a user into a jwt token.
 *
 * @param user
 * @returns
 */
// TODO: find the correct user type here.
// TODO: implement refresh token logic.
export const generateJWT = async (user: Object): Promise<string> => {
  return jwt.sign(user, JWT_SECRET , {
    expiresIn: 60 * 60 * 24 * 7 // one week,
  });
};
