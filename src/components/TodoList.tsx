import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTodoAsync } from "../redux/todoSlice";

const TodoList: React.FC = () => {
  const todos = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);

  return (
    <ul className="list-group">
      {todos.map((todo: { id: number; title: string; completed: boolean }) => (
        <TodoItem
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          key={todo.id}
        />
      ))}
    </ul>
  );
};

export default TodoList;
