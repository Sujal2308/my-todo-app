import { useState, useEffect } from "react";
import TaskBox from "./TaskBox";

const UserTask = () => {
  const [userTask, setUserTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user previously enabled dark mode
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    document.documentElement.classList.toggle("dark");
    console.log("Dark mode:", newDarkMode);
    console.log("HTML classes:", document.documentElement.classList);
  };

  const addTask = () => {
    if (userTask.trim()) {
      setTaskList([...taskList, userTask]);
      setUserTask("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-violet-800 dark:text-violet-400 text-center">
            Task Manager
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-violet-100 dark:bg-violet-800 
                     hover:bg-violet-200 dark:hover:bg-violet-700 
                     transition-all duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-violet-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            className="flex-1 px-4 py-3 rounded-lg border border-violet-300 
                     dark:border-violet-700 dark:bg-gray-800 dark:text-white
                     focus:border-violet-500 focus:ring-2 focus:ring-violet-200 
                     dark:focus:ring-violet-800 outline-none transition-all duration-200"
            type="text"
            placeholder="Add a new task..."
            value={userTask}
            onChange={(e) => setUserTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />
          <button
            className="px-6 py-3 bg-violet-500 hover:bg-violet-600 
                     dark:bg-violet-600 dark:hover:bg-violet-700
                     text-white font-medium rounded-lg transition-all 
                     duration-200 shadow-md hover:shadow-lg"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <TaskBox task={taskList} setTask={setTaskList} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default UserTask;
