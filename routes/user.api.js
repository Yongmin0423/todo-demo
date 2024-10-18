import express from "express";
import { joinUser, postLogin } from "../controller/user.controller.js";

const router = express();

//1. 회원가입 endpoint
router.post("/", joinUser);
router.post("/login", postLogin);

export default router;
