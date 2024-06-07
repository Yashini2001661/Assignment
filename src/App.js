import React from 'react';
import TaskForm from './components/TaskForm';

const App = () => {
  return (
    <div>
      <h1>Marketing Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
