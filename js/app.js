const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const message = document.querySelector("#message");

let todos = [];

//todoForm에서 버튼을 눌렀을대 이 밑에 코드를 다 실행함
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = todoInput.value;
  //   console.log(todos);
  //   const item = document.createElement("li");
  //   item.textContent = text;

  //   todoList.append(item);
  const newTodo = {
    id: Date.now().toString() + "-" + Math.random().toString(2, 8),
    text: text,
    completed: false,
  };

  // 삭제를 누르면 안에 내용을 다 지우곘다
  todos.push(newTodo);
  todoInput.value = "";
  console.log(todos);
  //   message.textContent = "테스트입니다.";

  saveTodos();

  // 각각의 요소(todo)에 접근한다
  todos.forEach(function (todo) {
    const item = document.createElement("li");
    item.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "text-button";
    editButton.textContent = "수정";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    // text-button delete-button 두가지버튼를 동시에 적용하겠다 (색깔만 달리하겠다)
    deleteButton.className = "text-button delete-button";
    deleteButton.textContent = "삭제";

    item.append(checkbox, text, editButton, deleteButton);
    todoList.append(item);
    // <li class="todo-item"></li>;
    // <input type="checkbox" class="todo-checkbox" />;
  });
});

function saveTodos() {
  // 데이터 베이스가 잠시 꺼지거나 에러가 나면 실행 하는 코드
  try {
    // 새로고침 눌렀을때 안지워지게 하는 거
    // 개발자 도구에서 console 메뉴 옆에 화살표를 눌러서 어플리케이션을 누르고 http://127.0.0.1:5501에 들어가면
    // id, 직렬 형태로 다 들어간다
    localStorage.setItem("daily-note", JSON.stringify(todos));
    // id가 message인걸 가져오겠습니다
  } catch (error) {
    message.textContent =
      "저장되지 않았습니다. 새로고침하여 다시 시도해주세요.";
  }
}
