import React, { useState } from "react";

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [toDoList, setToDoList] = useState([]);

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
                                        setToDoList([...toDoList, inputValue]);
                                        setInputValue("");
                                    }
                                }}
                            />
                        </li>
                        {toDoList.map((t, index) => (
                            <li key={index}>
                                {t}
                                <i class="fa-solid fa-trash" onClick={() => setToDoList(toDoList.filter((t, currentIndex) => index != currentIndex))}></i>
                            </li>
                        ))}
                        <div className="counterTask">{toDoList.length} Tasks</div>
                    </ul>
                </div>

    );
}

export default Todo;
