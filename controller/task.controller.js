import Task from "../model/Task.js";

//req가 프론트엔드에서 오는 데이터이다
export const postTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const { userId } = req;
    // const newTask = new Task({ task, isComplete });
    //  await newTask.save();

    // 이렇게 작성하면 save()를 따로 하지 않아도 생성과 동시에 저장하는 역할을 한다.
    const newTask = await Task.create({
      task,
      isComplete,
      author: userId,
    });
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

export const getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v").populate("author");
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

    // 권한 체크
    if (task.author.toString() !== req.userId) {
      return res.status(403).json({ message: "변경 권한이 없습니다." });
    }

    const fields = Object.keys(req.body);
    fields.map((item) => (task[item] = req.body[item]));
    await task.save();
    res.status(200).json({ status: "ok", data: task });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    console.log("task", task.auth);
    if (task.author.toString() !== req.userId) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }
    console.log();
    const deleteItem = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "ok", data: deleteItem });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};
