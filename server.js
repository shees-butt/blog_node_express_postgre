const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./src/blog/routes");

app.use(express.json());

// Use user routes
app.use(userRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
