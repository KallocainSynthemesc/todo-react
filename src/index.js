import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserForm from './UserForm';
import TodoDetails from './TodoDetails';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="todo-react" element={<UserForm />} />
        <Route path="User" element={<UserForm />}/>
        <Route path="User/:userId/Todos" element={<App />}/>
        <Route path="todo-react/:userId/Todos" element={<App />}/>
        <Route path="User/:userId/Todos/:todoId/Details"  element={<TodoDetails />}/>
        <Route path="todo-react/:userId/Todos/:todoId/Details" element={<TodoDetails />}/>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
