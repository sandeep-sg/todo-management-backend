import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  updateTodoStatus,
} from "../controller/todo.controller.js";
import verifyToken from '../middleware/verifyToken.js'

const todoRouter = express.Router();
// todo Routes
// todoRouter.use(verifyToken)
todoRouter.post("/",verifyToken, createTodo);
todoRouter.get("/",verifyToken, getAllTodos);
todoRouter.get("/:id",verifyToken, getTodo);
todoRouter.delete("/:id",verifyToken, deleteTodo);
todoRouter.put("/:id",verifyToken,updateTodo);
todoRouter.patch("/:id",verifyToken,updateTodoStatus);

export default todoRouter;
