import express from "express";
import { getUser, joinUser, postLogin } from "../controller/user.controller.js";
import { authenticate } from "../controller/auth.controller.js";

const router = express.Router();

//1. 회원가입 endpoint
router.post("/", joinUser);
router.post("/login", postLogin);
//토큰을 통해 유저 id빼내고 => 그 아이디로 유저 객체 찾아서 보내주기
router.get("/me", authenticate, getUser);
export default router;
