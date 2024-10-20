import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.JWT_SECRET_KEY;

//토큰을 검증해주는 함수
export const authenticate = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("invalid token");
    }
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, key, (error, payload) => {
      if (error) {
        throw new Error("invalid token");
      }
      req.userId = payload._id;
    });
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
