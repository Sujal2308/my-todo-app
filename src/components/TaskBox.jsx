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
    <div>
      {task.map((val, index) => {
        return (
          <div
            className="flex flex-row items-center justify-center mt-5"
            key={index}
          >
            {editIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="px-2 py-2 border border-violet-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(index);
                }}
              />
            ) : (
              <h1
                className={`inline px-2 py-2 bg-violet-500 ${
                  doneStates[index] ? "line-through" : "text-white"
                }`}
              >
                {val}
              </h1>
            )}
            <button
              className="px-2 py-2 bg-red-500 ml-2"
              onClick={() => toggleDone(index)}
            >
              done
            </button>
            {editIndex === index ? (
              <button
                className="px-2 py-2 bg-green-500 ml-2"
                onClick={() => saveEdit(index)}
              >
                Save
              </button>
            ) : (
              <button
                className="px-2 py-2 bg-yellow-500 ml-2"
                onClick={() => startEdit(index, val)}
              >
                Edit
              </button>
            )}
            <button
              className="px-2 py-2 bg-blue-500 ml-2"
              onClick={() => removeTask(index)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default TaskBox;
