import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(3001, () => {
  console.log(`The server is running on PORT:3001`);
});
