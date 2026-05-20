const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const User = require("../models/User");


// GET ALL USERS (ADMIN ONLY)
router.get(
    "/users",
    protect,
    authorizeRoles("admin"),

    async (req, res) => {

        try {

            const users = await User.find().select("-password");

            res.json({
                success: true,
                users
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
);

module.exports = router;