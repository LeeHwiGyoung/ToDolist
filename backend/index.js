import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 5000;
const __dirname = path.resolve();
const corsOptions = {
  orgin: "127.0.0.1",
  optionsSuccessStatus: 200,
};

const dummyData = fs.readFileSync("./test.json", "utf-8");
const jsonDummy = JSON.parse(dummyData);

app.use(cors(corsOptions));

app.get("/todolist", (req, res) => {
  const checkUser = jsonDummy.user.find((item) => {
    return item.userName === req.query.userName;
  });
  if (checkUser) {
    res.json(checkUser);
  }
});

app.listen(PORT, () => {
  console.log(`server onload  listening on port ${PORT}`);
});
