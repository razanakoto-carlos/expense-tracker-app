import express from "express";
import type { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json("Hello Word from docker!!");
});

app.listen(3001, () => {
  console.log(`The server is running on PORT:3001`);
});
