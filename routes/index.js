import express from "express";
import taskApi from "./task.api.js";

const router = express.Router();
router.use("/tasks", taskApi);

export default router;
