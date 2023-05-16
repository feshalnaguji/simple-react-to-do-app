import Todo from "./Todo";
import Card from "../UI/Card";
import classes from "./Todos.module.css";

const Todos = (props) => {
  return (
    <Card className={classes.todos}>
      {props.todo.map((todo, i) => (
        <Todo
          checkChange={props.onCheck}
          onClick={props.onClick}
          key={i}
          todo={todo}
        />
      ))}
    </Card>
  );
};

export default Todos;
