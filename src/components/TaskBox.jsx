import { useState } from "react";
const TaskBox = ({ task, setTask }) => {
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
    <div className="max-w-3xl mx-auto p-4">
      {task.map((val, index) => {
        return (
          <div
            className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            key={index}
          >
            {editIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-grow px-4 py-2 border border-violet-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(index);
                }}
              />
            ) : (
              <h1
                className={`flex-grow px-4 py-2 rounded-md ${
                  doneStates[index]
                    ? "line-through text-gray-500 bg-gray-100"
                    : "text-gray-800 bg-violet-50"
                } font-medium`}
              >
                {val}
              </h1>
            )}
            <div className="flex flex-row gap-2 mt-2 sm:mt-0">
              <button
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  doneStates[index]
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-medium`}
                onClick={() => toggleDone(index)}
              >
                {doneStates[index] ? "Completed" : "Done"}
              </button>

              {editIndex === index ? (
                <button
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200 font-medium"
                  onClick={() => saveEdit(index)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors duration-200 font-medium"
                  onClick={() => startEdit(index, val)}
                >
                  Edit
                </button>
              )}
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200 font-medium"
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
