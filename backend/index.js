import express from "express";
import fs, { write } from "fs";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 5000;
const __dirname = path.resolve();
const corsOptions = {
  orgin: "127.0.0.1",
  optionsSuccessStatus: 200,
};

function writeTodo(toDoItem) {
  const json = fs.readFileSync(__dirname + "/toDo.json");
  const data = JSON.parse(json);
  const toDoList = data.toDoList;
  let last_id = toDoList.length !== 0 ? Number(toDoList.slice(-1)[0].id) : -1;
  const newToDo = toDoItem;
  newToDo.id = last_id + 1;
  const saveData = [...data.toDoList, newToDo];
  return JSON.stringify(saveData);
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/toDoList", (req, res) => {
  res.header("Content-Type:application/json");
  if (!fs.existsSync(__dirname + "/toDo.json")) {
    fs.writeFileSync(__dirname + "/toDo.json", '{"toDoList" : []}');
  }
  res.sendFile(__dirname + "/toDo.json");
});

app.post("/toDo", (req, res) => {
  res.header("Content-Type:application/json");
  if (req.body) {
    const data = writeTodo(req.body);
    fs.writeFileSync(
      __dirname + "/toDo.json",
      `{ "toDoList" : ${data} }`,
      (error) => {
        console.log(error);
      }
    );
    const toDoList = fs.readFileSync(__dirname + "/toDo.json");
    res.send(toDoList);
  }
});

app.delete("/toDo", (req, res) => {
  console.log(req.query.id);
  let text = "";
  const toDoList = JSON.parse(fs.readFileSync(__dirname + "/toDo.json"));
  const filterdToDoList = JSON.stringify(
    toDoList.toDoList.filter((item, idx) => {
      if (item.id !== req.query.id) {
        return item;
      } else {
        text = `{ toDo : ${item.toDo}, isDone : ${item.isDone} } 이 삭제되었습니다.`;
      }
    })
  );

  fs.writeFileSync(
    __dirname + "/toDo.json",
    `{"toDoList" : ${filterdToDoList}}`
  );
  res.send(text);
});

app.put("/toDo", (req, res) => {
  res.header("Content-Type:application/json");
  if (req.body) {
    console.log(req.body);
    /* const data = { todoList: req.body.todoList };
    for (const [idx, item] of data.todoList.entries()) {
      item.id = `${idx + 1}`;
    }
    fs.writeFileSync(
      __dirname + "/todo.json",
      JSON.stringify(data),
      (error) => {
        console.log(error);
      }
    ); */
    const toDoList = JSON.parse(fs.readFileSync(__dirname + "/toDo.json"));

    res.json(toDoList);
  }
});

app.listen(PORT, () => {
  console.log(`server onload  listening on port ${PORT}`);
});
