import { fireEvent, render, screen   } from '@testing-library/react';
import UserForm from './UserForm';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Button } from 'react-bootstrap';


test("loginform submit (homepage loading)", () => {
  render(
    <BrowserRouter>
      <UserForm />
    </BrowserRouter>
  );
  const buttonElement = screen.getByText(/List Todos/i);
  expect(buttonElement).toBeInTheDocument();
  const titleElement = screen.getByLabelText(/User Name/i);
  expect(titleElement).toBeInTheDocument();

  const inputEl = screen.getByTestId("username");
  expect(inputEl).toBeInTheDocument();
  userEvent.type(inputEl, "Kilian");

  const descriptionElement = screen.getByDisplayValue(/Kilian/i);
  expect(descriptionElement).toBeInTheDocument();

  const mockOnClick = jest.fn()
  render(<Button onClick={mockOnClick()} />)
  const clickIndicator = screen.getByTestId('user-submit')
  fireEvent.click(clickIndicator)
  expect(mockOnClick).toHaveBeenCalledTimes(1)

});

