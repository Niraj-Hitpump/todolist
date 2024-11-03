import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
    BsCircleFill,
    BsFillCheckCircleFill,
    BsFillTrashFill,
} from "react-icons/bs";

const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/get")
            .then((res) => {
                setTodos(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleEdit = (id) => {
        axios
            .put("http://localhost:3001/update", { id: id })
            .then(() => {
                // Toggle the `done` status in the local state
                setTodos(todos.map(todo => 
                    todo._id === id ? { ...todo, done: !todo.done } : todo
                ));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDelete = (id) => {
        axios
            .delete("http://localhost:3001/delete/" + id)
            .then((res) => {
                if (res.data.success) {
                    setTodos(todos.filter(todo => todo._id !== id)); // Update state without reload
                } else {
                    console.log("Delete failed:", res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    

    return (
        <div className="home">
            <h2>ToDo List</h2>
            <Create setTodos={setTodos} todos={todos} />
            {todos.length === 0 ? (
                <div>
                    <h2>No Records</h2>
                </div>
            ) : (
                todos.map((todo, index) => (
                    <div key={index} className="task">
                        <div
                            className="checkbox"
                            onClick={() => handleEdit(todo._id)}
                        >
                            {todo.done ? 
                                <BsFillCheckCircleFill className="icon" />
                             : 
                                <BsCircleFill className="icon" />
                            }
                            <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span>
                                <BsFillTrashFill className="icon" 
                                    onClick={() => handleDelete(todo._id)}/>
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
