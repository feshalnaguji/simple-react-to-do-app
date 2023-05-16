import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Load todos from local storage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedTodos = Array.from(todos);
    const [movedTodo] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, movedTodo);

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodos = [...todos, { text: inputValue, completed: false }];
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const handleSaveTodo = (index) => {
    if (editValue.trim() !== "") {
      const updatedTodos = [...todos];
      updatedTodos[index].text = editValue;
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setEditIndex(null);
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  const handleClearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const filterTodos = (todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
    } else if (filter === "active") {
      return !todo.completed;
    }
  };

  return (
    <div className="todo-list-container">
      <h1>Futuristic ToDo App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a todo"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <ul
              className="todo-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos.filter(filterTodos).map((todo, index) => (
                <Draggable
                  key={index}
                  draggableId={`todo-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="todo-item"
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleTodo(index)}
                      />
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                      ) : (
                        <label
                          className={todo.completed ? "completed" : ""}
                          onClick={() => handleToggleTodo(index)}
                        >
                          {todo.text}
                        </label>
                      )}
                      {editIndex === index ? (
                        <>
                          <button onClick={() => handleSaveTodo(index)}>
                            Save
                          </button>
                          <button onClick={handleCancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => handleEditTodo(index)}>
                          Edit
                        </button>
                      )}
                      <button onClick={() => handleDeleteTodo(index)}>
                        Delete
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <button className="clear-button" onClick={handleClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
};

export default App;
