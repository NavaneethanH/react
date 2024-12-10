import { Fragment, useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [getCompletedOnly, setCompletedOnly] = useState(false);

  useEffect(() => {
    if (getCompletedOnly) {
      getTodosList(true);
    } else {
      getTodosList(false);
    }
  }, [getCompletedOnly]);

  async function getTodosList(completed) {
    console.log(todos, "getTodosList");
    if (completed) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos?completed=true`
      );
      const todos = await res.json();
      setTodos(todos);
    } else {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const todos = await res.json();
      setTodos(todos);
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-end gap-3 mt-2">
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
          Completed Todo Filter
        </label>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked={getCompletedOnly}
            onChange={(event) => setCompletedOnly(event.target.checked)}
          />
        </div>
      </div>
      {todos && todos.length > 0 && (
        <div className="row mt-2 g-2">
          {todos.map((item, i) => (
            <div className="col-3" key={i}>
              <div className={`card ${item.completed ? "bg-success" : ""}`}>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <h5 className="card-title">Status: {item.completed}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
