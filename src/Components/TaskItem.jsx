import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Assigned to: {task.assigned_to}</p>
    </div>
  );
};

export default TaskItem;
