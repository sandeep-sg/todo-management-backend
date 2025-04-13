import { Todo } from "../model/todo.model.js";

export const getAllTodos = async (req, res) => {
  try {
    const todo = await Todo.find({ userId: req.userId });
    res.status(200).json({ todo, message: "Get all todos" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
export const getTodo = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const todo = await Todo.findOne({
      _id: id,
      userId: userId,
    });
    res.status(200).json({ todo, message: "Get todo" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const createTodo = (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      userId: req.userId,
    });
    todo.save();
    res.status(201).json({ todo, message: "Todo created" });
  } catch (errors) {
    console.log(errors);
    res.status.json({ message: "server error" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    // const todo = await Todo.findAndUpdate(id, req.body);
    const todo = await Todo.findOneAndUpdate({ _id: id, userId }, req.body);
    res.status(200).json({ todo, message: "Todo updated" });
  } catch (errors) {
    console.log(errors);
    res.status(500).json("server error");
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const todo = await Todo.findOneAndDelete({
      _id: id,
      userId: userId,
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo does't exist." });
    }
    res.status(200).json({ todo, message: "Todo deleted" });
  } catch (errors) {
    console.log(errors);
    res.status(500).json({message:"server error"});
  }
};
export const updateTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const existTodo = await Todo.findOne({
      _id: id,
      userId,
    });
    if (!existTodo) {
      return res.status(404).json({ message: "Todo does't exist" });
    }
    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        completed: !existTodo.completed,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ todo, message: "Todo status updated" });
  } catch (errors) {
    console.log(errors);
    res.status(500).json({message:"server error"});
  }
};
