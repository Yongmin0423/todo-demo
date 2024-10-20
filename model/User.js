import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

//User 모델 정의
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String },
    age: { type: Number },
  },
  { timestamps: true }
);

//저장 전에 유저 패스워드를 해시하는 미들웨어
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, secretKey, { expiresIn: "1d" });
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
