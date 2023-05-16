import Card from "../UI/Card";
import classes from "./Todo.module.css";
import Input from "../UI/Input";

const Todo = (props) => {
  const deleteTodoHandler = () => {
    props.onClick(props.todo.id);
  };

  return (
    <Card onClick={deleteTodoHandler} className={classes.todo}>
      <Input
        type="checkbox"
        checked={props.todo.completed}
        onChange={() => props.checkChange(props.todo.id)}
      ></Input>
      <span>{props.todo.task}</span>
    </Card>
  );
};

export default Todo;
