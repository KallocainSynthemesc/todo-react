
let todoCount = 0;
const todo = {
  title: "This is a sample todo",
  description: "You can change the description in the details view if you want",
  done: false,
  dateModification: Date.now(),
  dateCreation: Date.now(),
  id : 0
};

export function saveUser(obj, callback) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };

  fetch("/todo/resources/Intervenant", requestOptions)
    .then((response) => response.json())
    .then((data) => callback(data.id + "/Todos"))
    .catch((error) => {
      console.log("saveUser: Fallback to mock environment. Remove from production code. Error: " + error)
      obj.id = 1;
      todo.id = todoCount++;
      let todos = [todo];
      window.localStorage.setItem("Todos", JSON.stringify(todos));
      callback(obj.id + "/Todos")
    });
}

export function getTodo(todoId, callback) {
    fetch("/todo/resources/Todo/"+todoId)
    .then(response => {
      let json = response.json();
      return json
    })
    .then(data => {
      console.log(data);
      callback(data)
    }).catch((error) => {
      console.log("getTodo: Fallback to mock environment. Remove from production code. Error: " + error)
      let todos = JSON.parse(window.localStorage.getItem("Todos"));
      console.log(JSON.stringify(todos));
      const todo = todos.find(element => element.id === parseInt(todoId));
      console.log(JSON.stringify(todo));
      callback(todo);
    });
}

export function getTodos(userId, callback) {
  fetch("/todo/resources/Intervenant/"+userId+"/Todos")
  .then(response => {
    let json = response.json();
    return json
  })
  .then(data => {
    console.log(data);
    callback(data)
  }).catch((error) => {
    console.log("getTodos: Fallback to mock environment. Remove from production code. Error: " + error)
    let todos = JSON.parse(window.localStorage.getItem("Todos"));
    callback(todos);
  });
}

export function saveTodo(obj, param, callback) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };

  fetch('/todo/resources/Intervenant/'+param+'/Todo', requestOptions)
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => {
      console.log("saveTodo:Fallback to mock environment. Remove from production code. Error: " + error)
      let todos = JSON.parse(window.localStorage.getItem("Todos"));
      obj.id = todoCount++;
      let newTodos = [...todos, obj];
      window.localStorage.setItem("Todos", JSON.stringify(newTodos));
      console.log(JSON.stringify(newTodos));
      callback(obj);
    });
}

export function updateTodo(obj, todoId, callback, callbackParam) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };

  console.log(JSON.stringify(obj));
  fetch('/todo/resources/Todo/' + todoId, requestOptions)
    .then((response) => response.json())
    .then((data) => callback(callbackParam))
    .catch((error) => {
      console.log("updateTodo :Fallback to mock environment. Remove from production code. Error: " + error)
      const todos = JSON.parse(window.localStorage.getItem("Todos"));
      const objIndex = todos.findIndex((element => element.id === obj.id));
      todos[objIndex].description = obj.description;
      todos[objIndex].dateModification = obj.dateModification;
      window.localStorage.setItem("Todos", JSON.stringify(todos));
      callback(callbackParam);
    });
}


