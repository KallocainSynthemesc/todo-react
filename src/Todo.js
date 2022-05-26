import React from "react";
import { Form } from 'react-bootstrap';

export function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        {todo.text}
      </span>
      <div>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Check when done"
          variant="outline-success"
          onClick={() => markTodo(index)} />
      </div>
    </div>
  );
}
