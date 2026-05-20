const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const validate = require("../middleware/validationMiddleware");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created
 */
// CREATE TASK
router.post(
    "/",

    protect,

    [
        body("title")
            .notEmpty()
            .withMessage("Title is required")
    ],

    validate,

    createTask
);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched
 */
// GET TASKS
router.get("/", protect, getTasks);


// UPDATE TASK
router.put("/:id", protect, updateTask);


// DELETE TASK
router.delete("/:id", protect, deleteTask);

module.exports = router;