import { useState, useEffect } from 'react';
import { supabase } from '../db.js';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default function TaskManager() {
  // --- MEMORY (State) ---
  const [tasks, setTasks] = useState([]);      // Stores the list of tasks from DB
  const [title, setTitle] = useState('');      // Stores what's currently typed in Title input
  const [desc, setDesc] = useState('');        // Stores what's currently typed in Desc input
  const [editingId, setEditingId] = useState(null); // Stores ID if we are editing, otherwise null

  // --- TRIGGERS ---
  // Run fetchTasks immediately when the page loads
  useEffect(() => { fetchTasks(); }, []);

  // --- LOGIC FUNCTIONS ---
  async function fetchTasks() {
    const { data } = await supabase.from('tasks').select('*').order('id', { ascending: false });
    setTasks(data || []); // Update our "Memory" with the DB results
  }

  async function handleSubmit() {
    if (editingId) {
      // If we have an editingId, we UPDATE
      await supabase.from('tasks').update({ title, description: desc }).eq('id', editingId);
    } else {
      // Otherwise, we INSERT new row
      await supabase.from('tasks').insert([{ title, description: desc }]);
    }
    resetForm();
    fetchTasks(); // Refresh the list after changes
  }

  async function handleDelete(id) {
    await supabase.from('tasks').delete().eq('id', id);
    fetchTasks(); // Refresh list
  }

  function resetForm() {
    setEditingId(null);
    setTitle('');
    setDesc('');
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>
      
      {/* Why all the values? Because TaskForm is just a "dumb" box. 
        We have to give it the variables (Props) so it knows what to show 
        and what functions to call when a button is clicked.
      */}
      <TaskForm 
        title={title} setTitle={setTitle} 
        desc={desc} setDesc={setDesc} 
        onAction={handleSubmit} 
        isEditing={!!editingId} 
        onCancel={resetForm} 
      />

      {/* We pass the list of tasks to the TaskList component to draw them */}
      <TaskList 
        tasks={tasks} 
        onEdit={(t) => { setEditingId(t.id); setTitle(t.title); setDesc(t.description); }} 
        onDelete={handleDelete} 
      />
    </div>
  );
}