import { useState, useEffect } from 'react';
import { supabase } from '../db.js';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function TaskManager() {
  // --- REACT MEMORY (STATE) ---
  // [Current Value, Function to Update Value]
  const [tasks, setTasks] = useState([]);      // Array of tasks from DB (empty initially)
  const [formData, setFormData] = useState({ title: '', description: '' }); // Object to hold form input values
  const [editId, setEditId] = useState(false);  // Stores ID only if we are editing
  
  // GET all tasks from Supabase
  async function getData() {
    const { data } = await supabase
                    .from('tasks')
                    .select('*') // select all columns
                    .order('id', { ascending: false }); // newest tasks first
    setTasks(data || []); // Save data to React memory
  }

  // This runs getData() once when the page loads. react reruns code on every change, but this empty array [] means "only run once"
  useEffect(() => { getData(); }, []);

  async function saveData() {
    // build object to send to Supabase. key must match column names in DB.
    const taskInfo = { title: formData.title, description: formData.description };

    if (editId) {
      // UPDATE row in the "tasks" table where id = editId
      const { error} = await supabase
                      .from('tasks')
                      .update(taskInfo) // single object containing new data
                      .eq('id', editId); // "WHERE id = editId"
      if (error) {
      console.error("Error updating task:", error.message);
      } 
      else {
      console.log("Success! The task is now in the database.");
      }
    } else {
      // INSERT row(s) into the "tasks" table.
      const { error } = await supabase
                      .from('tasks')
                      .insert([taskInfo]); // array of objects containing the data
      if (error) {
        console.error('Error inserting task:', error.message);
      } else {
        console.log('Task inserted successfully');
      }
    }
    
    clearForm(); // Reset input fields
    getData();   // Refresh the list
  }
  // DELETE a task
  async function removeData(id) {
    const { error } = await supabase
                      .from('tasks')
                      .delete()
                      .eq('id', id); // "WHERE id = id"
    if (error) {
      console.error('Error deleting task:', error.message);
    } else {
      console.log('Task deleted successfully');
    }
    getData(); // Refresh the list
  }

  function clearForm() {
    setEditId(false);
    setFormData({ title: '', description: '' });
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>
      
      {/* Passing data and functions down to the Input Form */}
      <TaskForm 
        formData={formData} 
        setFormData={setFormData}
        onAction={saveData} 
        editId={editId}
        onCancel={clearForm} 
      />

      {/* Passing the list and delete/edit functions to the List display */}
      <TaskList 
        tasks={tasks} 
        onEdit={(t) => {setEditId(t.id); // Store the ID of the task we want to change
                        setFormData({ title: t.title, description: t.description }); }} 
        onDelete={removeData} 
      />
    </div>
  );
}

export default TaskManager;