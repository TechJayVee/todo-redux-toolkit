import { useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TotalCompleteItems from "./components/TotalCompleteItems";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container bg-white p-4 mt-5">
      <h1>My Todo List</h1>
      <AddTodoForm />
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
}

export default App;
