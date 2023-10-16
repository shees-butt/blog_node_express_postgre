const createUserQuery = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
const getUserQuery = "SELECT * FROM users WHERE username = $1";

module.exports = {
    createUserQuery,
    getUserQuery,
};
