import express from "express";
import mongoose, { Error } from "mongoose";
import userRouter from "./routes/users.routes.js";
// import postRouter from "./routes/posts.routes.js";
import dotenv from 'dotenv'
import postRouter from "./routes/posts.routes.js";

const app = express();

dotenv.config()

await mongoose.connect(
    process.env.MONGODB
   );

console.log("connect");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use('/users',userRouter)

app.use('/posts', postRouter)


app.listen(process.env.PORT_DEV, () => {
  console.log("Server is running!");
});
