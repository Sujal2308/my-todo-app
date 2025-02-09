import { useState } from "react";
import TaskBox from "./TaskBox";
const UserTask = () => {
  const [userTask, setUserTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const addTask = () => setTaskList([...taskList, userTask]);
  return (
    <>
      <div className="flex flex-row items-center justify-center mt-50">
        <input
          className="px-3 py-5 bg-amber-500"
          type="text"
          placeholder="Add a task"
          value={userTask}
          onChange={(e) => setUserTask(e.target.value)}
        />
        <button
          className="px-3 py-5 bg-red-500 font-bold font-mono"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      {/* <h1 className="text-center ">{taskList}</h1> */}
      <TaskBox task={taskList} setTask={setTaskList} />
    </>
  );
};
export default UserTask;
