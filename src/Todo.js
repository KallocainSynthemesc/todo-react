import React from "react";
import { Button, Form } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";

export function Todo({ todo, index, markTodo }) {
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = todo.id + "/Details"; 
    navigate(path);
  }

  return (
    <div className="todo">
      <span style={{ textDecoration: todo.done ? "line-through" : "" }}>
        <b>Title: </b>{todo.title}
      </span><br></br>
      <div>
        <Form.Check
          data-testid={"check-todo" + todo.id}
          type="switch"
          id="custom-switch"
          label="Check when done"
          variant="outline-success"
          checked={todo.done}
          onChange={() => markTodo(index)} />
        <Button block="true" size="lg" type="submit" onClick={routeChange} data-testid={"shows-details" + todo.id}>
          Show Details
        </Button>
      </div>
    </div>
  );
}
