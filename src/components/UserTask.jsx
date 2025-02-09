import { useState } from "react";
import TaskBox from "./TaskBox";

const UserTask = () => {
  const [userTask, setUserTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    if (userTask.trim()) {
      setTaskList([...taskList, userTask]);
      setUserTask("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-violet-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-8 font-mono">
          Task Manager📝
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              className="flex-grow px-4 py-3 border border-violet-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-violet-500 
                         focus:border-transparent transition-all duration-200
                         placeholder:text-violet-300"
              type="text"
              placeholder="Add a new task..."
              value={userTask}
              onChange={(e) => setUserTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <button
              className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg
                         hover:bg-violet-700 transform hover:scale-105
                         transition-all duration-200 whitespace-nowrap"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        </div>

        <TaskBox task={taskList} setTask={setTaskList} />
      </div>
    </div>
  );
};

export default UserTask;
