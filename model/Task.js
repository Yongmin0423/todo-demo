import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    isComplete: { type: Boolean, required: true },
    //mongoose에서 제공하는 id타입
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  //데이터가 생긴 시간을 자동으로 적어준다.
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
