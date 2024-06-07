import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    fetchTasks();
  }, []);
  
  const fetchTasks = async () => {
    const response = await axios.get('/tasks');
    setTasks(response.data);
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
