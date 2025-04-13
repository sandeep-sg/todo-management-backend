import jwt from "jsonwebtoken";
const genrateTokenAndSetCookie = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction, // ✅ Only true in production
    sameSite: isProduction ? "None" : "Lax", // ✅ Allow cross-origin cookies in production
    expires: new Date(Date.now() + 86400000),
  });
};
export default genrateTokenAndSetCookie;
