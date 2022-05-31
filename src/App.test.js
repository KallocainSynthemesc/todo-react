import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import userEvent from '@testing-library/user-event';
import ReactTestUtils from 'react-dom/test-utils';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});


it("test fetch,display and click handler", async () => {
    let todos = [{
        title: "This is a sample todo",
        description: "You can change the description in the details view if you want",
        done: false,
        dateModification: Date.now(),
        dateCreation: Date.now(),
        id : 0
    },{
        title: "Second todo",
        description: "Description for second sample todo",
        done: false,
        dateModification: Date.now(),
        dateCreation: Date.now(),
        id : 1
    }];
    jest.spyOn(global, "fetch")
      .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve(todos) })
     );

    render(<BrowserRouter><App/></BrowserRouter>, container);
    expect(window.fetch).toHaveBeenCalledTimes(1)
    const formTitleElement = screen.getByText(/Add Todo/i);
    expect(formTitleElement).toBeInTheDocument();
    const submitElement = screen.getByText(/Submit/i);
    expect(submitElement).toBeInTheDocument();
    const titleElement = await waitFor(() => screen.findByText(/This is a sample todo/i));
    expect(titleElement).toBeInTheDocument();
    const descriptionlement = await waitFor(() => screen.findByText(/You can change the description in the details view if you want/i));
    expect(descriptionlement).toBeInTheDocument();
    const secondtitleElement = await waitFor(() => screen.findByText(/Second todo/i));
    expect(secondtitleElement).toBeInTheDocument();
    const seconddescriptionlement = await waitFor(() => screen.findByText(/Description for second sample todo/i));
    expect(seconddescriptionlement).toBeInTheDocument();

    const mockOnClick = jest.fn()
    render(<Button onClick={mockOnClick()} />)
    const clickIndicator = screen.getByTestId('shows-details0')
    fireEvent.click(clickIndicator)
    expect(mockOnClick).toHaveBeenCalledTimes(1);

    global.fetch.mockRestore();
});

it("test saving of todo", async () => {

  let kstodo = {
    title: "KilianTodo",
    description:
      "whatever",
    done: false,
    dateModification: Date.now(),
    dateCreation: Date.now(),
    id: 1,
  };

  jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.resolve({
      json: () =>
      Promise.resolve({
        title: "KilianTodo",
        description:
          "hardcoded description in the fake POST",
        done: false,
        dateModification: Date.now(),
        dateCreation: Date.now(),
        id: 1,
      }),
    }))
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([kstodo]),
      })
    );

  render(<BrowserRouter><App/></BrowserRouter>, container);

  const todoField = screen.getByTestId("form-input");
  userEvent.type(todoField, "KilianTodo");
  const todoFieldText = screen.getByDisplayValue(/KilianTodo/i);
  expect(todoFieldText).toBeInTheDocument();

  const clickIndicator = screen.getByTestId('form-submit')
  fireEvent.click(clickIndicator)

  expect(await screen.findByText(/hardcoded description in the fake POST/i)).toBeInTheDocument()
  
  global.fetch.mockRestore();
});

it("test updating of todo", async () => {
  let todos = [
    {
      title: "This is a sample todo",
      description:
        "You can change the description in the details view if you want",
      done: false,
      dateModification: Date.now(),
      dateCreation: Date.now(),
      id: 0,
    }
  ];
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(todos) })
    );

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    container
  );
  expect(window.fetch).toHaveBeenCalledTimes(1);
  const titleElement = await waitFor(() => screen.findByText(/This is a sample todo/i));
  expect(titleElement).toBeInTheDocument();

  const clickIndicator = screen.getByTestId('check-todo0')
  ReactTestUtils.Simulate.click(clickIndicator);
  expect(await clickIndicator.checked).toEqual(false);

});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});