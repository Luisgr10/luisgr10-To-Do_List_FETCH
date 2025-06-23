export const createUser = () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0' },
      body: JSON.stringify([])
    };

    fetch('https://playground.4geeks.com/todo/users/Luisgr10', options)
      .then(response => response.json())
      .then(() => console.log("Usuario creado")) // Cambié esta línea para que solo se ejecute después de la respuesta exitosa
      .catch(err => console.log(err));
  }

export const getAllTask = (setToDoList) => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0' },
    };

    fetch('https://playground.4geeks.com/todo/users/Luisgr10', options)
      .then( (response) => {
        if (!response.ok ) {
          createUser()
        } else return (response.json())
      })
      .then(data => {
        console.log(data.todos)
        setToDoList(data.todos)})
      .catch(err => {
        if (err.status === 404) { createUser() }
      });
  }

export const addTask = (event, setInputValue, setToDoList) => {
    let newTask = {
      label: event,
      done: false
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0' },
      body: JSON.stringify(newTask)
    };

    fetch('https://playground.4geeks.com/todo/todos/Luisgr10', options)
      .then(response => response.json())
      .then(() => {
        setInputValue("");
        getAllTask(setToDoList)
      })
      .catch(err => console.error(err));
  }

export const completedTask = (id, setToDoList) => {
    let updatedTask = {
        label: "completada",
        donde: true
    }
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0' },
      body: JSON.stringify(updatedTask)
    };

    fetch(`https://playground.4geeks.com/todo/todos/${id}`, options)
      .then(response => response.json())
      .then(() => {
        getAllTask(setToDoList)
      })
      .catch(err => {
        if (err.status === 404) { createUser() }
      });
  }

  export const deleteTask = (id, setToDoList) => {
    
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0' },
    };

    fetch(`https://playground.4geeks.com/todo/todos/${id}`, options)
       .then(response => {
      if (!response.ok) throw new Error("No se pudo eliminar");
      // No intentes hacer .json() si la respuesta es 204 No Content
      getAllTask(setToDoList);
    })
      .catch(err => {
        if (err.status === 404) { createUser() }
      });
  }