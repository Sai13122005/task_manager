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

    <div className="dashboard-container">

        <div className="card-dark p-4 mb-4">

            <div className="d-flex justify-content-between align-items-center">

                <div>

                    <h1>Task Dashboard</h1>

                    <h5 className="text-light">
                        Welcome, {user?.name}
                    </h5>

                </div>

                <button
                    className="btn btn-danger btn-modern"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>


        <div className="card-dark p-4 mb-4">

            <h3 className="mb-3">
                Create Task
            </h3>

            <input
                type="text"
                placeholder="Task Title"
                className="form-control mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Task Description"
                className="form-control mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button
                className="btn btn-primary btn-modern"
                onClick={createTask}
            >
                Add Task
            </button>

        </div>


        <div className="row">

            {
                tasks.map((task) => (

                    <div
                        className="col-md-6 col-lg-4 mb-4"
                        key={task._id}
                    >

                        <div className="card-dark p-4 task-card">

                            <h4>{task.title}</h4>

                            <p className="text-light">
                                {task.description}
                            </p>

                            <p>
                                {
                                    task.status === "completed"
                                        ? "✅ Completed"
                                        : "⏳ Pending"
                                }
                            </p>

                            <div className="d-flex gap-2">

                                <button
                                    className="btn btn-success btn-modern"
                                    onClick={() => markDone(task._id)}
                                >
                                    Done
                                </button>

                                <button
                                    className="btn btn-danger btn-modern"
                                    onClick={() => deleteTask(task._id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>
                ))
            }

        </div>

    </div>
);
}

export default Dashboard;