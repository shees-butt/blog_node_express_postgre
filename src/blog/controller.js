const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUserQuery, getUserQuery } = require("./queries");

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user with the same email already exists
        const userCheck = await pool.query(getUserQuery, [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Hash the password for security
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Store the user in the database
        const result = await pool.query(createUserQuery, [username, email, hashedPassword]);
        const user = result.rows[0];

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user with the provided email exists
        const userResult = await pool.query(getUserQuery, [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Passwords match - generate and return a JWT token
            const token = jwt.sign({ userId: user.id }, "your-secret-key", { expiresIn: "1h" });
            res.status(200).json({ message: "Login successful", token });
        } else {
            // Passwords don't match
            res.status(401).json({ error: "Incorrect password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    signup,
    login,
};
