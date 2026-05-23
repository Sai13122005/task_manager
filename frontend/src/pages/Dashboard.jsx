import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
    const user = JSON.parse(
        localStorage.getItem("user")
    );
    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const navigate = useNavigate();

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
        localStorage.removeItem("user");

        navigate("/login");
    };
    

    return (

    <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
                <h2>Dashboard</h2>

                <h5>
                    Welcome, {user?.name}
                </h5>
            </div>

            <button
                className="btn btn-danger"
                onClick={logout}
            >
                Logout
            </button>

        </div>


        <div className="card p-4 shadow mb-4">

            <input
                type="text"
                placeholder="Task title"
                className="form-control mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Description"
                className="form-control mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button
                className="btn btn-primary"
                onClick={createTask}
            >
                Add Task
            </button>

        </div>


        {
            tasks.map((task) => (

                <div
                    key={task._id}
                    className="card shadow-sm p-3 mb-3"
                >

                    <h4>{task.title}</h4>

                    <p>{task.description}</p>

                    <p>
                        Status:
                        {
                            task.status === "completed"
                                ? " ✅ Completed"
                                : " ⏳ Pending"
                        }
                    </p>

                    <div className="d-flex gap-2">

                        <button
                            className="btn btn-success"
                            onClick={() => markDone(task._id)}
                        >
                            Done
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() => deleteTask(task._id)}
                        >
                            Delete
                        </button>

                    </div>

                </div>
            ))
        }

    </div>
);
}

export default Dashboard;