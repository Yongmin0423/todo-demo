import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import indexRouter from "./routes/index.js";

const app = express();
//json 파일을 읽어올 때 쓰는 body-parser 코드
app.use(bodyParser.json());
app.use("/api", indexRouter);

const mongoURI = `mongodb://localhost:27017/todo-demo`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log("DB connection fail", err));

app.listen(5000, () => {
  console.log("server on 5000");
});
