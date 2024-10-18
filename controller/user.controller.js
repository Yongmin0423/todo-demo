import User from "../model/User.js";
import bcrypt from "bcrypt";

//유저회원 가입 controller
export const joinUser = async (req, res) => {
  try {
    //req.body에서 유저 정보 받아오기
    const { name, email, password, location, age } = req.body;
    //이메일이 존재하는지 확인
    const exist = await User.exists({ email });
    if (exist) {
      throw new Error("This user is already join.");
    }
    await User.create({
      name,
      email,
      password,
      location,
      age,
    });
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "fail", err });
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ status: "fail" });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({ status: "fail" });
  }
  const token = user.generateToken();
  return res.status(200).json({ status: "success", user, token });
};
