// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import TaskDetail from './TaskDetail';
import EditTask from './EditTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  return (
    <div>
      <AddTask onTaskAdded={handleTaskAdded} />
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span onClick={() => setSelectedTask(task)}>{task.title}</span>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => {
              axios.delete(`http://localhost:5000/api/tasks/${task._id}`)
                .then(() => handleTaskDeleted(task._id))
                .catch(error => console.error('Error deleting task:', error));
            }}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedTask && !isEditing && (
        <TaskDetail task={selectedTask} />
      )}
      {isEditing && selectedTask && (
        <EditTask task={selectedTask} onEditComplete={() => {
          setIsEditing(false);
          fetchTasks();
        }} />
      )}
    </div>
  );
};

export default TaskList;
