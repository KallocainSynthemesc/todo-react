import React from "react";
import { Button, Form } from 'react-bootstrap';

export function FormTodo({ saveNewTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value)
      return;
    saveNewTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><b>Add Todo</b></Form.Label>
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" data-testid="form-input"/>
      </Form.Group>
      <Button variant="primary mb-3" type="submit" data-testid="form-submit">
        Submit
      </Button>
    </Form>
  );
}
