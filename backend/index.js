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

function init() {
  if (!fs.existsSync(__dirname + "/toDo.json")) {
    fs.writeFileSync(__dirname + "/toDo.json", '{"toDoList" : []}');
  }
}

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

function updateTodo(toDoItem) {
  const json = fs.readFileSync(__dirname + "/toDo.json");
  const data = JSON.parse(json);
  const toDoList = data.toDoList;
  const target = toDoList.find((item) => item.id === toDoItem.id);
  for (const key of Object.keys(target)) {
    target[key] = toDoItem[key];
  }
  return JSON.stringify(data);
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//JSON 형태의 투두 리스트 반환
app.get("/toDo", (req, res) => {
  res.header("Content-Type:application/json");
  res.sendFile(__dirname + "/toDo.json");
});

//클라이언트에서 todoItem 을 보낼 시 JSON 에 저장
app.post("/toDo", (req, res) => {
  res.header("Content-Type:application/json");
  if (req.body) {
    const data = writeTodo(req.body);
    fs.writeFileSync(
      __dirname + "/toDo.json",
      `{ "toDoList" : ${data} }`,
      (error) => {
        console.error(error);
      }
    );
    const toDoList = fs.readFileSync(__dirname + "/toDo.json");
    res.send(toDoList);
  }
});

//toDoitem 삭제
app.delete("/toDo", (req, res) => {
  let text = "";
  const targetId = Number(req.query.id);
  const toDoList = JSON.parse(fs.readFileSync(__dirname + "/toDo.json"));
  const filterdToDoList = JSON.stringify(
    toDoList.toDoList.filter((item, idx) => {
      if (item.id !== targetId) {
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
    const data = updateTodo(req.body);
    fs.writeFileSync(__dirname + "/toDo.json", data, (error) => {
      console.error(error);
    });
  }

  const toDoList = fs.readFileSync(__dirname + "/toDo.json");
  res.send(toDoList);
});

app.listen(PORT, () => {
  console.log(`server onload  listening on port ${PORT}`);
  init();
});
