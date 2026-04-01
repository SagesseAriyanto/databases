import { useState, useEffect } from 'react';
import { supabase } from '../db.js';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ImageUpload from '../components/imageUpload.jsx'; // Import the new component

function TaskManager({ userEmail }) {
  // --- REACT MEMORY (STATE) ---
  // [Current Value, Function to Update Value]
  const [tasks, setTasks] = useState([]);      // Array of tasks from DB (empty initially)
  const [formData, setFormData] = useState({ title: '', description: '' }); // Object to hold form input values
  const [file, setFile] = useState(null);       // Memory for the chosen image file
  const [editId, setEditId] = useState(false);  // Stores ID only if we are editing
  const [errorMessage, setErrorMessage] = useState('');
  
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

  /* --- REAL-TIME SUBSCRIPTION ---
This listens for NEW data being added to the "tasks" table, so the UI updates instantly without the user having to refresh. */
  useEffect(() => {
    // Create a "Channel" (a private radio frequency for your app)
    const channel = supabase.channel("tasks-channel");

    // Tell the channel to listen for "INSERT" events on the "tasks" table
    channel.on(
      "postgres_changes", 
      { event: "INSERT", schema: "public", table: "tasks" }, 
      (payload) => {
        // payload.new = the actual row that was just created in the database
        const newTask = payload.new; 

        // Update the UI by adding the new task to the TOP of the current list
        // (prevTasks) => ... ensures we are using the most up-to-date list in memory
        setTasks((prevTasks) => [newTask, ...prevTasks]);
      }
    )
    // Actually turn the listener ON
    .subscribe();

    // THE CLEANUP (The Destructor)
    // If the user leaves this page, we must stop the listener to save memory.
    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Empty array means: "Setup this listener once when the page loads."

  async function saveData() {
    setErrorMessage('');
    let imageUrl = null;

    if (!formData.title.trim()) return setErrorMessage('Task title is required.');

    // --- OPTIONAL IMAGE UPLOAD ---
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('tasks-images') // Make sure this bucket exists and is public!
        .upload(fileName, file);

      if (uploadError) return setErrorMessage("Image upload failed." + uploadError.message);
      
      // Get the public URL to save in the database
      const { data: urlData } = supabase.storage.from('tasks-images').getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }
    // Note that we must have policies in Supabase to allow inserting this new "image_url" column!

    const taskInfo = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      image_url: imageUrl // Add this column to your 'tasks' table in Supabase!
    };

    const query = editId 
      ? supabase.from('tasks').update(taskInfo).eq('id', editId) 
      : supabase.from('tasks').insert({ ...taskInfo, email: userEmail });

    const { error } = await query;
    
    if (error) {
      setErrorMessage(error.message);
    } else {
      clearForm();
      getData();
    }
  }

  // DELETE a task
  async function removeData(id) {
    setErrorMessage('');
    const { error } = await supabase.from('tasks').delete().eq('id', id); 
    if (error) setErrorMessage(error.message);
    else getData(); // Refresh the list
  }

  function clearForm() {
    setEditId(false);
    setFile(null);
    setFormData({ title: '', description: '' });
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <div className="flex justify-between items-center mb-8 pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <p className="text-sm opacity-60">Welcome, {userEmail}</p>
        </div>
        <button className="btn btn-outline btn-error btn-sm" onClick={() => supabase.auth.signOut()}>
          Logout
        </button>
      </div>
      
      <ImageUpload onFileSelect={setFile} selectedFile={file} />

      <TaskForm 
        formData={formData} setFormData={setFormData}
        onAction={saveData} editId={editId} onCancel={clearForm} 
      />

      {errorMessage && (
        <div className="alert alert-error mb-6"><span>{errorMessage}</span></div>
      )}

      <TaskList 
        tasks={tasks} 
        onEdit={(t) => {
          setEditId(t.id);
          setFormData({ title: t.title, description: t.description }); 
        }} 
        onDelete={removeData} 
      />
    </div>
  );
}

export default TaskManager;