const createUserQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
const getUserQuery = "SELECT * FROM users WHERE email = $1";


module.exports = {
    createUserQuery,
    getUserQuery,
};
