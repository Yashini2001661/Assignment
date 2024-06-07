/*Enable team members to update task statuses*/
import React, { useState } from 'react';
import axios from 'axios';

const TaskStatusUpdateForm = ({ taskId }) => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/tasks/${taskId}`, { status });
            // Add success message or update UI
        } catch (error) {
            console.error('Error updating task status:', error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <button type="submit">Update Status</button>
        </form>
    );
};

export default TaskStatusUpdateForm;
