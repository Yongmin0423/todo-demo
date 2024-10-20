import express from "express";
import {
  deleteTask,
  getTask,
  postTask,
  putTask,
} from "../controller/task.controller.js";
import { authenticate } from "../controller/auth.controller.js";

const router = express.Router();
router.post("/", authenticate, postTask);

router.get("/", getTask);

router.put("/:id", authenticate, putTask);

router.delete("/:id", authenticate, deleteTask);

export default router;
