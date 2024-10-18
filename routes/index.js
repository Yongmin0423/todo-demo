import express from "express";
import taskApi from "./task.api.js";
import userApi from "./user.api.js";

const router = express.Router();
router.use("/tasks", taskApi);
router.use("/user", userApi);

export default router;
