# 투두 리스트
fetch 연습을 하기위해서 간단하게 만든 ToDoList 서버입니다.
## 1. 실행방법
- git clone https://github.com/LeeHwiGyoung/ToDolist.git .
- cd backend
- npm install
- npm run dev
## 2. 기능
- 프론트엔드에서 전송한 투두 리스트를 받아 파일의 형태로 저장
- 투두리스트의 추가 , 수정 , 삭제 , 조회 기능

## 3.URL 구조
|URL|HTTP Method | 설명 | 입력 값 |입력 예시 | 반환 값  | 반환 예시 |
|:---:| :---: |:---:|:---:|:---:|:---:|:---:|
| /toDo | get | 저장된 toDoList JSON 파일을 반환합니다. | | | JSON | { "toDoList": [{"toDo": "할 일","isDone": false,"id": 0}]} |
| /toDo | post | 저장된 toDoList JSON 파일에 ToDoItem을 추가합니다.| object | {"toDo":"할 일 1","isDone":false} | JSON |  { "toDoList": [{"toDo": "할 일","isDone": false,"id": 0}, {"toDo" "할 일 1" , "isDone" : false , "id": 1}]}  |
| /toDo | put | 저장된 toDoList JSON 파일에서 변경하고자 하는 ToDoItem을 찾아 변경합니다.|object| {"toDo": "변경할 할 일","isDone": false,"id": 0}|JSON|{ "toDoList": [{"toDo": "변경할 할 일","isDone": false,"id": 0}, {"toDo" "할 일 1" , "isDone" : false , "id": 1}]}  |  
| /toDo | delete | 저장된 toDoList JSON 파일에서 삭제하고자 하는 ToDoItem을 찾아 삭제합니다.| id (숫자) | 0 | text |  {"toDo": "변경할 할 일","isDone": false,"id": 0} 이 삭제되었습니다. |
