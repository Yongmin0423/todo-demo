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
      throw new Error("이미 등록된 사용자입니다");
    }
    await User.create({
      name,
      email,
      password,
      location,
      age,
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "빈 칸을 채워주세요" });
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "해당 이메일을 가진 사용자를 찾을 수 없습니다",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res
      .status(400)
      .json({ status: "fail", message: "비밀번호가 일치하지 않습니다" });
  }
  const token = user.generateToken();
  return res.status(200).json({ status: "success", user, token });
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("can't find user");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// middleware
