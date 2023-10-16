const createUserQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
const getUserQuery = "SELECT * FROM users WHERE email = $1";
const createPostQuery = "INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *";
const getAllPostsQuery = "SELECT * FROM posts";
const getPostByIdQuery = "SELECT * FROM posts WHERE id = $1";
const updatePostQuery = "UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3";
const deletePostQuery = "DELETE FROM posts WHERE id = $1";


module.exports = {
    createUserQuery,
    getUserQuery,
    createPostQuery,
    getAllPostsQuery,
    getPostByIdQuery,
    updatePostQuery,
    deletePostQuery,
};
