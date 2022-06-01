import React, { useEffect } from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Todo } from "./Todo";
import { FormTodo } from "./FormTodo";
import { useParams } from "react-router-dom";
import { saveTodo, getTodos, updateTodo } from './Fetecher'

function App() {
  const [todos, setTodos] = React.useState([]);

  let params = useParams();

  useEffect(() => {
    getTodos(params.userId, setSortedTodos)
  },[]) //empty array to prevent recursion

  const saveNewTodo = (text) =>{
    const todo = { title: text, description: '', done: false, dateModification: Date.now(), dateCreation: Date.now() };
    saveTodo(todo, params.userId, addTodo);
  };

  const setSortedTodos = (data) =>
  {
    const todos = data.sort(compare);
    setTodos(todos);
  }

  const addTodo= (todo) =>{
    let newTodos = [...todos, todo];
    newTodos = newTodos.sort(compare);
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    let newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    newTodos[index].dateModification = Date.now();
    updateTodo(newTodos[index],newTodos[index].id, setSortedTodos, newTodos);
  };

  const compare = (a, b) => {
    if(a.done !== b.done)
      return a.done ? 1 : -1
    else if(a.done === false)
      return b.dateCreation - a.dateCreation;
    else
       return a.dateModification - b.dateModification;
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo saveNewTodo={saveNewTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card key={todo.id}>
              <Card.Body>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
