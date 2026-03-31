// The arguments in the { } are "Props". They are values sent from the Parent (TaskManager).
function TaskForm({ formData, setFormData, onAction, editId, onCancel }) {
  return (
    <div className="card bg-base-200 p-6 shadow-xl mb-10">
      {/* if editId is a number, show "Edit Task", otherwise show "Add New Task" */}
      <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Task" : "Add New Task"}</h2>
      
      <div className="flex flex-col gap-4">
        <input 
          className="input input-bordered w-full" 
          placeholder="Task Title" 
          value={formData.title} 
          onChange={(e) => setFormData({ ...formData, title: e.target.value })} // When user types, update Parent's memory
        />

        <textarea 
          className="textarea textarea-bordered w-full" 
          placeholder="Description" 
          value={formData.description} 
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
        />

        <div className="flex gap-2">
          <button className="btn btn-primary flex-1" onClick={onAction}>
            {editId ? "Update Task" : "Add Task"}
          </button>
          
          {/* Only show Cancel button if we are currently editing */}
          {editId && <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
        </div>
      </div>
    </div>
  );
}

export default TaskForm;