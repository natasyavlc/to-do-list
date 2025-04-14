"use client"

import React, { useState } from 'react'
import styles from './ToDoList.module.css'
import Link from "next/link";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        category: "",
    });
    const [editIndex, setEditIndex] = useState(null);
    const [active, setActive] = useState(false);
    const [taskCompleted, setTaskCompleted] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [category, setCategory] = useState("");
    const listCategory = ["General", "Work", "Personal", "Shopping", "Education", "Other"]
    const filteredTasks = tasks.filter(task =>
        (!searchValue || task.title.toLowerCase().includes(searchValue) || task.description.toLowerCase().includes(searchValue)) &&
        (!category || task.category === category.toLowerCase())
    );

    function handleInputTitleChange(event) {
        setNewTask(prevState => ({
            ...prevState,
            title: event.target.value
        }));
    }

    function handleInputDescChange(event) {
        setNewTask(prevState => ({
            ...prevState,
            description: event.target.value
        }));
    }

    function addTask() {
        setActive(true);
        if (newTask.title.trim() !== "") {
            setTasks((prevTasks) => [...prevTasks, { ...newTask }]);
            setNewTask({ title: "", description: "", category: "" });
            setActive(false);
        }
    }

    function doneTask(index) {
        setTaskCompleted((prevTasks) => [...prevTasks, { ...tasks[index] }]);
        setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    }

    function editTask(index) {
        setEditIndex(index);
        setNewTask(tasks[index]);
        setActive(true);
    }

    function saveTask() {
        if (newTask.title.trim() !== "") {
            setTasks((prevTasks) =>
                prevTasks.map((task, index) =>
                    index === editIndex ? { ...newTask } : task
                )
            );

            setNewTask({ title: "", description: "", category: "" });
            setEditIndex(null);
            setActive(false);
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function undoCompletedTask(index) {
        setTasks((prevTasks) => [...prevTasks, taskCompleted[index]]);
        setTaskCompleted((prevCompleted) => prevCompleted.filter((_, i) => i !== index));
    }

    function handleSearchChange(event) {
        setSearchValue(event.target.value.toLowerCase());
    }

    function handleChangeCategory(event) {
        setCategory(event.target.value);
    }

    return (
        <>
            <Link href="/news">Today News</Link>

            <div className={styles.toDoList}>


                <h1> <strong>To Do List</strong></h1>
                <h6 style={{ color: "hsl(0, 0%, 40%)" }}>by natasyavlc</h6>

                <div className={styles.buttonWrapper}>
                    <button
                        className={styles.addButton}
                        style={{ display: active ? "none" : "block" }}
                        onClick={active ? () => setActive(false) : () => setActive(true)}
                    >
                        Add
                    </button>
                </div>
                {active &&
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            placeholder="Type your task title..."
                            value={newTask.title}
                            onChange={handleInputTitleChange} />
                        <br />
                        <input
                            type="text"
                            placeholder="Type your task description..."
                            value={newTask.description}
                            onChange={handleInputDescChange}
                            onKeyDown={(event) => event.key === 'Enter' && editIndex == null && addTask()} />
                        <br />
                        <select
                            className={styles.selectCategory}
                            value={newTask.category}
                            onChange={(e) => setNewTask(prevState => ({
                                ...prevState,
                                category: e.target.value
                            }))}
                        >
                            <option value="" disabled>Select your category</option>
                            {listCategory.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        <div className={styles.actionButtonWrapper}>
                            <button
                                className={styles.cancelButton}
                                onClick={() => {
                                    setNewTask({ title: "", description: "", category: "" });
                                    setActive(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className={styles.doneButton}
                                onClick={editIndex !== null ? saveTask : addTask}
                            >
                                {editIndex !== null ? "Save" : "Done"}
                            </button>
                        </div>
                    </div>}
                <ol className={styles.listWrapper}>
                    {tasks.length > 0 &&
                        <div className={styles.filterWrapper}>
                            <>
                                <label style={{ marginRight: "8px" }}>Choose a category:</label>
                                <select value={category} id="category" name="category" className={styles.filterCategory} onChange={handleChangeCategory}>
                                    <option value="" disabled>Select your category</option>
                                    <option value="">All Categories</option>
                                    {listCategory.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </>
                            <input
                                type="search"
                                placeholder="search by title or description..."
                                value={searchValue}
                                onChange={handleSearchChange}
                                onKeyDown={(event) => event.key === 'Enter' && handleSearchChange()} />
                        </div>}
                    {filteredTasks.map((task, index) => <li key={index}>
                        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                            <p className={`${styles.category} ${styles[task.category]}`}>{task.category}</p>
                            <span className={styles.textTitle}>{task.title}</span>
                            <span className={styles.textDesc}>{task.description}</span>
                        </div>
                        <button
                            className={styles.editButton}
                            onClick={() => doneTask(index)}>
                            ✅
                        </button>
                        <button
                            className={styles.editButton}
                            onClick={() => editTask(index)}>
                            Edit
                        </button>
                        <button
                            className={styles.deleteButton}
                            onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button
                            className={styles.moveButton}
                            onClick={() => moveTaskUp(index)}>
                            ⬆️
                        </button>
                        <button
                            className={styles.moveButton}
                            onClick={() => moveTaskDown(index)}>
                            ⬇️
                        </button>
                    </li>
                    )}
                </ol>
                {taskCompleted.length > 0 &&
                    <div>
                        <h2 className={styles.titleCompleted}>Task Completed</h2>
                        <ol className={styles.listWrapper}>
                            {taskCompleted.map((task, index) => <li key={index}>
                                <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                                    <span className={styles.category}>{task.category}</span>
                                    <span style={{ textDecoration: "line-through", color: "hsl(0, 0%, 40%)" }} className={styles.textTitle}>{task.title}</span>
                                    <span style={{ textDecoration: "line-through", color: "hsl(0, 0%, 40%)" }} className={styles.textDesc}>{task.description}</span>
                                </div>
                                <button
                                    className={styles.moveButton}
                                    onClick={() => undoCompletedTask(index)}>
                                    Undo Completed
                                </button>
                            </li>
                            )}
                        </ol>
                    </div>}
            </div>
        </>
    );
}

export default ToDoList