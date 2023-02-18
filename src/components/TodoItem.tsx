import { useDispatch } from "react-redux";
import { ToggleCompleteAsync, deleteTodoAsync } from "../redux/todoSlice";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = () => {
    dispatch(ToggleCompleteAsync({ id: id, completed: !completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTodoAsync({ id: id }));
  };
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center justify-content-between">
          <input
            type="checkbox"
            className="mr-4 form-check-input"
            defaultChecked={completed}
            onChange={handleCheckboxClick}
          ></input>
          {title}
        </span>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
