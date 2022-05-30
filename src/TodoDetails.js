import { useParams } from "react-router-dom";
import React, { useEffect } from "react"
import { Card,Button, Form } from 'react-bootstrap';
import { updateTodo, getTodo } from './Fetecher'
import { useNavigate } from "react-router-dom";


export default function TodoDetails() {
  const [todo, setTodo] = React.useState([]);
  const [value, setValue] = React.useState("");

  let params = useParams();
  let navigate = useNavigate(); 

  useEffect(() => {
    getTodo(params.todoId, setData);
  },[]) //empty array to prevent recursion

  const handleSubmit = e => {
    e.preventDefault();
    if (!value)
      return;

    todo.description = value;
    todo.dateModification = Date.now();
    updateTodo(todo, params.todoId, navigate, -1);
  };

  const setData = data =>{
    setTodo(data);
    setValue(data.description);
  }

  return (
      <div>
          <Card>
            <Card.Body>
              <h1>Title: {todo.title}</h1>
              <h2>Id: {todo.id}</h2>
              <h3>Creation Date: {new Date(todo.dateCreation).toDateString()}</h3>
              <h3>Modification Date: {new Date(todo.dateModification).toDateString()}</h3>
            </Card.Body>
          </Card>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label><b>Change Description</b></Form.Label>
              <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder={todo.description} />
            </Form.Group>
            <Button variant="primary mb-3" type="submit">
              Submit
            </Button>
          </Form>
      </div>
  );
}