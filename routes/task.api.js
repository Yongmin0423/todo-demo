import express from "express";
import {
  deleteTask,
  getTask,
  postTask,
  putTask,
} from "../controller/task.controller.js";

const router = express.Router();
router.post("/", postTask);

router.get("/", getTask);

router.put("/:id", putTask);

router.delete("/:id", deleteTask);

export default router;
