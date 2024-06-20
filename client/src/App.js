// src/App.js
import React from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

const App = () => {
  return (
    <div className="App">
      <h1>Task Management Application</h1>
      <AddTask />
      <TaskList />
    </div>
  );
};

export default App;
