import { useState } from "react";
const TaskBox = ({ task, setTask, darkMode }) => {
  const [doneStates, setDoneStates] = useState(
    new Array(task.length).fill(false)
  );

  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  const toggleDone = (index) => {
    const newDoneStates = [...doneStates];
    newDoneStates[index] = !newDoneStates[index];
    setDoneStates(newDoneStates);
  };

  const removeTask = (index) => {
    const newTaskList = [...task];
    newTaskList.splice(index, 1);
    setTask(newTaskList);

    // Also update doneStates when removing a task
    const newDoneStates = [...doneStates];
    newDoneStates.splice(index, 1);
    setDoneStates(newDoneStates);
  };

  const startEdit = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };

  const saveEdit = (index) => {
    const newTaskList = [...task];
    newTaskList[index] = editText;
    setTask(newTaskList);
    setEditIndex(-1);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {task.map((val, index) => {
        return (
          <div
            className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-4 p-3 
                     bg-white dark:bg-gray-800 rounded-lg shadow-md 
                     hover:shadow-lg transition-shadow duration-200"
            key={index}
          >
            <div className="w-full sm:flex-1">
              {editIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-violet-300 
                           dark:border-violet-700 dark:bg-gray-700 dark:text-white
                           focus:border-violet-500 focus:ring-2 focus:ring-violet-200 
                           dark:focus:ring-violet-800 outline-none transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(index);
                  }}
                />
              ) : (
                <h1
                  className={`px-4 py-2 rounded-md ${
                    doneStates[index]
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 line-through"
                      : "bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-300"
                  } font-medium`}
                >
                  {val}
                </h1>
              )}
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto">
              <button
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-md text-white font-medium 
                         transition-all duration-200 ${
                           doneStates[index]
                             ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                             : "bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700"
                         }`}
                onClick={() => toggleDone(index)}
              >
                {doneStates[index] ? "Completed" : "Mark Done"}
              </button>
              {editIndex === index ? (
                <button
                  className="flex-1 sm:flex-initial px-4 py-2 bg-green-500 hover:bg-green-600 
                           dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium 
                           rounded-md transition-all duration-200"
                  onClick={() => saveEdit(index)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="flex-1 sm:flex-initial px-4 py-2 bg-yellow-500 hover:bg-yellow-600 
                           dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-medium 
                           rounded-md transition-all duration-200"
                  onClick={() => startEdit(index, val)}
                >
                  Edit
                </button>
              )}
              <button
                className="flex-1 sm:flex-initial px-4 py-2 bg-red-500 hover:bg-red-600 
                         dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium 
                         rounded-md transition-all duration-200"
                onClick={() => removeTask(index)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default TaskBox;
