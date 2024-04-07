import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error.message);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
