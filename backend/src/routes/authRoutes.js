const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const validate = require("../middleware/validationMiddleware");

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
// REGISTER
router.post(
    "/register",

    [
        body("name")
            .notEmpty()
            .withMessage("Name is required"),

        body("email")
            .isEmail()
            .withMessage("Valid email required"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters")
    ],

    validate,

    registerUser
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
// LOGIN
router.post(
    "/login",

    [
        body("email")
            .isEmail()
            .withMessage("Valid email required"),

        body("password")
            .notEmpty()
            .withMessage("Password required")
    ],

    validate,

    loginUser
);

module.exports = router;