import React from "react";
import { Button, Form } from 'react-bootstrap';

export function FormTodo({ saveNewTodo }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !description)
      return;
    saveNewTodo(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Add Todo</h3>
      <Form.Group>
        <Form.Control type="text" className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" data-testid="form-input"/>
        <Form.Control type="text" className="input" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" data-testid="form-input"/>
      </Form.Group>
      <Button variant="primary mb-3" type="submit" data-testid="form-submit">
        Submit
      </Button>
    </Form>
  );
}
