/*Create a dashboard for viewing all available tasks*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/tasks');
                setTasks(response.data.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                // Handle error
            }
        };
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Task Dashboard</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title} - {task.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskDashboard;

/*Provide options to filter tasks by status or assigned team member*/
    
    const [filterStatus, setFilterStatus] = useState('');

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const filteredTasks = filterStatus ? tasks.filter(task => task.status === filterStatus) : tasks;

    return (
        <div>
            <h2>Task Dashboard</h2>
            <select value={filterStatus} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id}>{task.title} - {task.status}</li>
                ))}
            </ul>
        </div>
    );

    

