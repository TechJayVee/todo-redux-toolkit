import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodoAsync: any = createAsyncThunk(
  "todos/getTodoAsync",
  async () => {
    const response = await fetch("http://localhost:7000/todos");
    if (response.ok) {
      const todos = await response.json();
      return { data: todos };
    }
  }
);

export const addTodoAsync: any = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload: any) => {
    const response = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });
    if (response.ok) {
      const todo = await response.json();
      return { data: todo };
    }
  }
);

export const ToggleCompleteAsync: any = createAsyncThunk(
  "todos/ToggleCompleteAsync",
  async (payload: any) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });
    if (response.ok) {
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const deleteTodoAsync: any = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload: any) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return { id: payload.id };
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: false },
    { id: 3, title: "todo3", completed: false },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodoAsync.pending]: (state, action) => {
      console.log("Fetching Data");
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      console.log("Fetch Data Success");
      return action.payload.data;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.data);
    },
    [ToggleCompleteAsync.fulfilled]: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
