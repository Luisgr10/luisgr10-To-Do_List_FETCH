import React, { useEffect, useState } from "react";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const createUser = () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0' },
      body: JSON.stringify([])
    };

    fetch('https://playground.4geeks.com/apis/fake/todos/user/Luisgr10', options)
      .then(response => response.json())
      .then(() => console.log("Usuario creado")) // Cambié esta línea para que solo se ejecute después de la respuesta exitosa
      .catch(err => console.log(err));
  }

  const getAllTask = () => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0' },
    };

    fetch('https://playground.4geeks.com/apis/fake/todos/user/Luisgr10', options)
      .then( (response) => {
        if (!response.ok ) {
          createUser()
        } else return (response.json())
      })
      .then(data => setToDoList(data))
      .catch(err => {
        if (err.status === 404) { createUser() }
      });
  }

  useEffect(() => {
    getAllTask();
  }, [])

  const addTask = (event) => {
    let newTask = {
      label: event,
      done: false
    }

    let allNewTasks = [...toDoList, newTask]

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0' },
      body: JSON.stringify(allNewTasks)
    };

    fetch('https://playground.4geeks.com/apis/fake/todos/user/Luisgr10', options)
      .then(response => response.json())
      .then(() => {
        setInputValue("");
        getAllTask()
      })
      .catch(err => console.error(err));
  }

  const deleteTask = (id) => {
    const updatedTaskList = toDoList.filter((task) => task.id !== id);
    if (updatedTaskList.length === 0) {
      const defaultTask = {label:"Estas al dìa!", done: false}
      updatedTaskList.push(defaultTask)
    } 
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0' },
      body: JSON.stringify(updatedTaskList)
    };

    fetch('https://playground.4geeks.com/apis/fake/todos/user/Luisgr10', options)
      .then(response => response.json())
      .then(() => {
        setToDoList(updatedTaskList);
        setAlert({
          show: true,
          msg: "Tarea eliminada",
          type: "danger",
        });
      })
      .catch(err => {
        if (err.status === 404) { createUser() }
      });
  }

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
                addTask(inputValue)
              }
            }}
          />
        </li>
        {toDoList.map((t) => (
          <li key={t.id} className="m-2 fw-bold fs-4">
            {t.label}
            <i className="fa-solid fa-trash" onClick={() => deleteTask(t.id)}></i>
          </li>
        ))}

        <div className="counterTask">{toDoList.length} Tasks</div>
      </ul>
    </div>
  );
}

export default Todo;
