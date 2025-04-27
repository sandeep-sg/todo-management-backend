import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controller/auth.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import isUserVerified from "../middleware/isUserVerified.js";
const authRouter = express.Router();
authRouter.get("/check-auth", verifyToken, isUserVerified, checkAuth);
authRouter.post("/signup", signup);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);
export default authRouter;
