const Task = require("../models/Task");


// CREATE TASK
const createTask = async (req, res) => {

    try {

        const { title, description } = req.body;

        const task = await Task.create({
            title,
            description,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Task created",
            task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET MY TASKS
const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            createdBy: req.user._id
        });

        res.json({
            success: true,
            tasks
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE TASK
const updateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // ownership check
        if (task.createdBy.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.json({
            success: true,
            message: "Task updated",
            task: updatedTask
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE TASK
const deleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // ownership check
        if (task.createdBy.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        await task.deleteOne();

        res.json({
            success: true,
            message: "Task deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};