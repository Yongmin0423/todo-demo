import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import indexRouter from "./routes/index.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//순서가 라우터를 불러오기 전에 미들웨어를 사용해야 한다
app.use(cors());
//json 파일을 읽어올 때 쓰는 body-parser 코드
app.use(bodyParser.json());
app.use("/api", indexRouter);

const mongoURI = process.env.MONGODB_URI_PROD;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log("DB connection fail", err));

app.listen(5000, () => {
  console.log("server on 5000");
});
