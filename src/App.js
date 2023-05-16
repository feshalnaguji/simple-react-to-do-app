import { useState } from "react";

import Todos from "./components/Todos";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Form from "./UI/Form";

import classes from "./App.module.css";

const DUMMY_TODOS = [
  { id: 1, task: "Create project", completed: false },
  { id: 2, task: "Create 2nd project", completed: false },
];

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (event.target[0].value.trim() === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      const newTodo = [
        ...todos,
        { id: Math.random(), task: event.target[0].value, status: "pending" },
      ];
      setTodos(newTodo);
      event.target[0].value = "";
    }
  };

  const checkBoxChangeHandler = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodoHandler = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className={classes.app}>
      <Form onClick={onSubmitHandler}>
        <Input type="text" />
        <Button>Add</Button>
      </Form>
      {isEmpty && <p>Input shouldn't be empty.</p>}
      <Todos
        onClick={deleteTodoHandler}
        onCheck={checkBoxChangeHandler}
        todo={todos}
      />
    </div>
  );
};

export default App;
