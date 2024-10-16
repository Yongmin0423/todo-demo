import Task from "../model/Task.js";

//req가 프론트엔드에서 오는 데이터이다
export const postTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    // const newTask = new Task({ task, isComplete });
    //  await newTask.save();

    // 이렇게 작성하면 save()를 따로 하지 않아도 생성과 동시에 저장하는 역할을 한다.
    const newTask = await Task.create({
      task,
      isComplete,
    });
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

export const getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

export const putTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      throw new Error("App can not find the task");
    }
    const fields = Object.keys(req.body);
    fields.map((item) => (task[item] = req.body[item]));
    res.status(200).json({ status: "ok", data: task });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteItem = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "ok", data: deleteItem });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};
