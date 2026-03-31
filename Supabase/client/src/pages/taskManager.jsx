import { useState, useEffect } from 'react';
import { supabase } from '../db.js';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function TaskManager() {
  // --- REACT MEMORY (STATE) ---
  // [Current Value, Function to Update Value]
  const [tasks, setTasks] = useState([]);      // Array of tasks from DB
  const [title, setTitle] = useState('');      // Current text in Title input
  const [desc, setDesc] = useState('');        // Current text in Description input
  const [editId, setEditId] = useState(null);  // Stores ID only if we are editing

  // --- AUTO-TRIGGER ---
  // This runs getData() automatically as soon as the page opens
  useEffect(() => { getData(); }, []);

  // --- DATABASE LOGIC ---
  
  // 1. Fetch all tasks from Supabase
  async function getData() {
    const { data } = await supabase.from('tasks').select('*').order('id', { ascending: false });
    setTasks(data || []); // Save data to React memory
  }

  // 2. Add a new task OR Update an existing one
  async function saveData() {
    const taskInfo = { title: title, description: desc };

    if (editId) {
      // If we have an editId, update that specific row
      await supabase.from('tasks').update(taskInfo).eq('id', editId);
    } else {
      // Otherwise, create a new row
      await supabase.from('tasks').insert([taskInfo]);
    }
    
    clearForm(); // Reset the input fields
    getData();   // Refresh the list to show changes
  }

  // 3. Delete a task
  async function removeData(id) {
    await supabase.from('tasks').delete().eq('id', id);
    getData(); // Refresh the list
  }

  // Helper to clear the screen/inputs
  function clearForm() {
    setEditId(null);
    setTitle('');
    setDesc('');
  }

  // --- THE HTML (JSX) ---
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>
      
      {/* Passing data and functions down to the Input Form */}
      <TaskForm 
        title={title} setTitle={setTitle} 
        desc={desc} setDesc={setDesc} 
        onAction={saveData} 
        isEditing={!!editId} 
        onCancel={clearForm} 
      />

      {/* Passing the list and delete/edit functions to the List display */}
      <TaskList 
        tasks={tasks} 
        onEdit={(t) => { setEditId(t.id); setTitle(t.title); setDesc(t.description); }} 
        onDelete={removeData} 
      />
    </div>
  );
}

export default TaskManager;