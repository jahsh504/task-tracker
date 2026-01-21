import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const createTask = async () => {
    if (!title) return;

    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    setTitle("");
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/tasks/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    fetchTasks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Tracker</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <button onClick={createTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}

            {task.status === "TODO" && (
              <button onClick={() => updateStatus(task.id, "IN_PROGRESS")}>
                Start
              </button>
            )}

            {task.status === "IN_PROGRESS" && (
              <button onClick={() => updateStatus(task.id, "DONE")}>
                Finish
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
