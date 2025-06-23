import React,{ useEffect, useState } from "react";
import { getAllTask, completedTask, addTask, deleteTask } from "../fetchAPI";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    getAllTask(setToDoList);
  }, [])


  return (
    <div className="container">
      <h1>To-Do List</h1>
      <ul>
        <li>
          <input
            type="text"
            placeholder="Add new task"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask(inputValue, setInputValue, setToDoList)
              }
            }}
          />
        </li>
        {toDoList.map((t) => (
          <li key={t.id} className="m-2 fw-bold fs-4">
            {t.label}
            <i className="fa-solid fa-check" onClick={() => completedTask(t.id, setToDoList)}></i>
            <i className="fa-solid fa-trash" onClick={() => deleteTask(t.id, setToDoList)}></i>
          </li>
        ))}

        <div className="counterTask">{toDoList.length} Tasks</div>
      </ul>
    </div>
  );
}

export default Todo;
