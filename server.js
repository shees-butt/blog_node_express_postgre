const express = require("express");
const app = express();
const port = 3000;
const Routes = require("./src/blog/routes");

app.use(express.json());

// Call Api routes
app.use(Routes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
