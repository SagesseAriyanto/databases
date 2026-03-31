// The arguments in the { } are "Props". They are values sent from the Parent (TaskManager).
function TaskForm({ title, setTitle, desc, setDesc, onAction, isEditing, onCancel }) {
  return (
    <div className="card bg-base-200 p-6 shadow-xl mb-10">
      <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Task" : "Add New Task"}</h2>
      
      <div className="flex flex-col gap-4">
        {/* value={title} keeps the input in sync with the Parent's memory */}
        <input 
          className="input input-bordered w-full" 
          placeholder="Task Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} // When user types, update Parent's memory
        />

        <textarea 
          className="textarea textarea-bordered w-full" 
          placeholder="Description" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
        />

        <div className="flex gap-2">
          <button className="btn btn-primary flex-1" onClick={onAction}>
            {isEditing ? "Update Task" : "Add Task"}
          </button>
          
          {/* Only show Cancel button if we are currently editing */}
          {isEditing && <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
        </div>
      </div>
    </div>
  );
}

export default TaskForm;