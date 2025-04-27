import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  updateTodoStatus,
} from "../controller/todo.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import isUserVerified from "../middleware/isUserVerified.js";

const todoRouter = express.Router();
// todo Routes
// todoRouter.use(verifyToken)
todoRouter.post("/", verifyToken, isUserVerified, createTodo);
todoRouter.get("/", verifyToken, isUserVerified, getAllTodos);
todoRouter.get("/:id", verifyToken, isUserVerified, getTodo);
todoRouter.delete("/:id", verifyToken, isUserVerified, deleteTodo);
todoRouter.put("/:id", verifyToken, isUserVerified, updateTodo);
todoRouter.patch("/:id", verifyToken, isUserVerified, updateTodoStatus);

export default todoRouter;
