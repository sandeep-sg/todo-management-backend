import User from "../model/user.model.js";
import genrateTokenAndSetCookie from "../utils/genrateTokenAndSetCookie.js";
import { hashPasswordGenrate } from "../utils/hashPasswordGenrate.js";
import {
  sendResetPasswordEmail,
  sendVerificationCode,
} from "../utils/emails.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

const checkAuth = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user, message: "User get successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username && !email && !password) {
      throw new Error("All fields are required");
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return res.status(400).json({ message: "User already exist." });
    const hashPassword = await hashPasswordGenrate(password);
    const verificationToken = Math.floor(
      Math.random() * 900000 + 100000
    ).toString();
    const user = new User({
      username,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000, // validate for 10 minutes
    });
    await user.save();
    genrateTokenAndSetCookie(res, user._id);
    await sendVerificationCode(email, "Email verification", verificationToken);
    res
      .status(201)
      .json({ user, message: "Verification code send to you email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({ message: "Invalid OTP or expired." });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    res.status(200).json({ message: "Verification has been successfull." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      throw new Error("All fields are required");
    }
    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return res.status(400).json({ message: "Invalid credential." });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password incorrect." });
    }
    user.lastLogin = new Date();
    await user.save();
    genrateTokenAndSetCookie(res, user._id);
    res.status(200).json({ user, message: "Login successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
const isProduction = process.env.NODE_ENV === "production";
const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      path: "/",
    });
    res.status(200).json({ message: "Logout successfull." });
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new Error("Email is required");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    const token = crypto.randomBytes(32).toString("hex");
    (user.resetPasswordToken = token),
      (user.resetPasswordExpiresAt = Date.now() + 10 * 60 * 1000); // 10 min add on current time
    await user.save();
    sendResetPasswordEmail(
      user.email,
      "Reset password",
      `${process.env.FRONTEND_URL}/reset-password/${token}`
    );
    res
      .status(200)
      .json({ message: "Reset password link send to your email." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log("password", password);
  console.log("token", token);
  try {
    if (!token) {
      return res.status(404).json({ message: "Invalid token or expired" });
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashPassword = await hashPasswordGenrate(password);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
export {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
};
