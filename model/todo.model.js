import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    todo: { type: String, required: [true, "todo is required"] },
    completed: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
