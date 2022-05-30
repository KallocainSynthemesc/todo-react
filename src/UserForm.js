import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { saveUser } from "./Fetecher";
import "./UserForm.css";

export default function UserForm() {
  const [user, setUser] = useState({
    name: '',
    id: 0,
 });

  function validateForm() {
    return user.name.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  let navigate = useNavigate(); 
  
  const commit = () =>{ 
    saveUser(user, navigate)
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={user.name}
            onChange={(e) => setUser({...user, 'name': e.target.value})}
          />
        </Form.Group>
        <Button block="true" size="lg" type="submit" disabled={!validateForm()} onClick={commit}>
          List Todos
        </Button>
      </Form>
    </div>
  );
}
