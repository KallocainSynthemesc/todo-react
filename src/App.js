import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Todo } from "./Todo";
import { FormTodo } from "./FormTodo";

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "This is a sample todo",
      description: "can be empty, however you want",
      isDone: false,
      dateModified: Date.now(),
      dateCreation: Date.now()
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text: text, description: '', isDone: false, dateModified: Date.now(), dateCreation: Date.now() }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    let newTodos = [...todos];
    newTodos[index].isDone = !newTodos[index].isDone;
    newTodos[index].dateModified = Date.now();
    newTodos = newTodos.sort(compare);
    setTodos(newTodos);
  };

  const compare = (a, b) => {
    if(a.isDone !== b.isDone)
      return a.isDone ? 1 : -1
    else if(a.isDone === false)
      return a.dateCreation - b.dateCreation;
    else
       return a.dateModified - b.dateModified;
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
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
