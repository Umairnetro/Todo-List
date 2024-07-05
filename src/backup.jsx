import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  useEffect(() => {
    const TodoString = localStorage.getItem("todos");
    const savedTodos = JSON.parse(TodoString);
    setTodos(savedTodos);
  }, []);

  const handleAdd = () => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        todo,
        isCompleted: false,
      },
    ]);
    setTodo("");
    console.log(todos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    console.log(e, e.target);
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    console.log((newTodos[index].isCompleted = !newTodos[index].isCompleted));
    setTodos(newTodos);
    console.log(newTodos);
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container p-4 my-5 bg-primary-subtle rounded">
        <div className="addTodo">
          <div className="fs-5 fw-semibold">Add a Todo</div>
          <div className="input-group my-3">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="form-control"
              placeholder="Enter Todo"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-outline-primary"
              onClick={handleAdd}
              disabled={todo.length <= 3}
              type="button"
              id="button-addon2"
            >
              Save
            </button>
          </div>
        </div>
        <h2 className="fs-5 fw-semibold">Your Todos</h2>
        <input
          className="form-check-input me-2"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        Show Finished
        <div className="todos">
          {todos.length === 0 && <div>No Todos to display</div>}
          {todos.map((items) => {
            return (
              (showFinished || !items.isCompleted) && (
                <div
                  key={items.id}
                  className="todo p-3 rounded mt-3 bg-primary bg-opacity-10 d-flex align-items-center d-flex justify-content-between gap-3"
                >
                  <div className="d-flex gap-3 justify-content-center">
                    <input
                      name={items.id}
                      className="form-check-input"
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={items.isCompleted}
                    />
                    <div
                      className={
                        items.isCompleted ? "text-decoration-line-through" : ""
                      }
                    >
                      {items.todo}
                    </div>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={(e) => {
                        handleEdit(e, items.id);
                      }}
                      className="btn btn-primary "
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, items.id);
                      }}
                      className="btn btn-primary mx-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
