/*Allow team leads to assign tasks to team members*/
import React, { useState } from 'react';
import axios from 'axios';

const TaskAssignmentForm = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [assignedUser, setAssignedUser] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/tasks', {
                title: taskTitle,
                assignedUser: assignedUser
            });
            // Add success message or redirect to dashboard
        } catch (error) {
            console.error('Error assigning task:', error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task Title" />
            <select value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)}>
                {/* Options for team members */}
            </select>
            <button type="submit">Assign Task</button>
        </form>
    );
};

export default TaskAssignmentForm;
