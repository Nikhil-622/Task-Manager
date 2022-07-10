const express = require("express");
require("./db/connect");
const app = express();
const port = 3000;
const tasks = require("./routes/tasks");
const connectDb = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/notfound");

//Middleware
app.use(express.static("./public"));

app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
  } catch (err) {
    console.log(err);
  }
};
start();

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
