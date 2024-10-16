import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    isComplete: { type: Boolean, required: true },
  },
  //데이터가 생긴 시간을 자동으로 적어준다.
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
