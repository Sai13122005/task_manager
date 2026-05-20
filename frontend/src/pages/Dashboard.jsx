import { useEffect, useState } from "react";

import API from "../services/api";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");



    // FETCH TASKS
    const fetchTasks = async () => {

        try {

            const res = await API.get("/tasks");

            setTasks(res.data.tasks);

        } catch (error) {

            console.log(error);
        }
    };


    useEffect(() => {

        fetchTasks();

    }, []);



    // CREATE TASK
    const createTask = async () => {

        try {

            await API.post("/tasks", {
                title,
                description
            });

            setTitle("");
            setDescription("");

            fetchTasks();

        } catch (error) {

            alert("Task creation failed");
        }
    };

        const markDone = async (id) => {

        try {

            await API.put(`/tasks/${id}`, {
                status: "completed"
            });

            fetchTasks();

        } catch (error) {

            alert("Update failed");
        }
    };


    // DELETE TASK
    const deleteTask = async (id) => {

        try {

            await API.delete(`/tasks/${id}`);

            fetchTasks();

        } catch (error) {

            alert("Delete failed");
        }
    };
    const logout = () => {

        localStorage.removeItem("token");

        window.location.href = "/login";
    };
    

    return (

        <div style={{ padding: "20px" }}>

            <h2>Dashboard</h2>

            <button onClick={logout}>
                Logout
            </button>
            <br /><br />
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br /><br />

            <button onClick={createTask}>
                Add Task
            </button>


            <hr />


            {
                tasks.map((task) => (

                    <div key={task._id}>

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>
                            Status:
                            {
                                task.status === "completed"
                                    ? " ✅ Completed"
                                    : " ⏳ Pending"
                            }
                        </p>
                        <button
                            onClick={() => markDone(task._id)}
                        >
                            Done
                        </button>
                        <button
                            onClick={() => deleteTask(task._id)}
                        >
                            Delete
                        </button>

                        <hr />

                    </div>
                ))
            }

        </div>
    
    );
}

export default Dashboard;