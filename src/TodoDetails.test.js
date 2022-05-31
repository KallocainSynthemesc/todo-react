import { render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import TodoDetails from './TodoDetails';
import { BrowserRouter } from 'react-router-dom';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});


it("test fetch and display", async () => {
    const todo = {
        title: "This is a sample todo",
        description: "You can change the description in the details view if you want",
        done: false,
        dateModification: Date.now(),
        dateCreation: Date.now(),
        id : 0
    };
    jest.spyOn(global, "fetch")
      .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(todo) })
      );

    render(<BrowserRouter><TodoDetails/></BrowserRouter>, container);
    const titleElement = await waitFor(() => screen.findByText(/This is a sample todo/i));
    expect(titleElement).toBeInTheDocument();
    const idElement = await waitFor(() =>screen.findByText(/Id: 0/i));
    expect(idElement).toBeInTheDocument();
    const descriptionElement = await waitFor(() =>screen.findByDisplayValue(/You can change the description in the details view if you want/i));
    expect(descriptionElement).toBeInTheDocument();
    
    global.fetch.mockRestore();
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});