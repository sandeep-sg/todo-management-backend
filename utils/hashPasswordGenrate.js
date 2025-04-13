import bcryptjs from "bcryptjs";
export const hashPasswordGenrate = async (password) => {
  const hashPassword = await bcryptjs.hash(password, 10);
  return hashPassword;
};
