import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "Unautherized. Please Login " });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(404).json("Unautherized or Invalid token");
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default verifyToken;
