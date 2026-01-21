const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = {
    id: uuidv4(),
    title,
    status: "TODO",
    createdAt: new Date()
  };

  tasks.push(task);
  res.status(200).json(task);
});

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.put("/tasks/:id/status", (req, res) => {
  const { status } = req.body;
  const task = tasks.find(t => t.id === req.params.id);

  const validStatuses = ["TODO", "IN_PROGRESS", "DONE"];

  if (!task) {
    return res.status(400).json({ error: "Task not found" });
  }

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  if (task.status === "TODO" && status === "DONE") {
    return res
      .status(400)
      .json({ error: "Cannot move directly from TODO to DONE" });
  }

  task.status = status;
  res.status(200).json(task);
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
