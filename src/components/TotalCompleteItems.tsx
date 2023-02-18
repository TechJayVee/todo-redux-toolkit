import { useSelector } from "react-redux";

const TotalCompleteItems: React.FC = () => {
  const completedTodo = useSelector((state: any) =>
    state.todos.filter(
      (todo: { completed: boolean }) => todo.completed === true
    )
  );

  return <h4 className="mt-3">Total Complete Items: {completedTodo.length}</h4>;
};

export default TotalCompleteItems;
