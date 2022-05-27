import React from "react";
import { Form } from 'react-bootstrap';

export function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        <b>Title: </b>{todo.text}
      </span><br></br>
      <span>
        <b>Date Creation:</b> {todo.dateCreation}, <b>Date Modification:</b> {todo.dateModified}
      </span>
      <div>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Check when done"
          variant="outline-success"
          checked={todo.isDone}
          onClick={() => markTodo(index)} />
      </div>
    </div>
  );
}
