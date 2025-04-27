import User from "../model/user.model.js";

const isUserVerified = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!user.isVerified) {
    return res.status(401).json({ message: "Please verify user accound" });
  }
  next();
};
export default isUserVerified;
