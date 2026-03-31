export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Task Details</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* We loop through the 'tasks' array and create a <tr> for each one */}
          {tasks.map((task) => (
            <tr key={task.id} className="hover">
              <td>
                <div className="font-bold">{task.title}</div>
                <div className="text-sm opacity-50">{task.description}</div>
              </td>
              
              <td className="text-right">
                {/* Clicking these calls the functions we passed down from the Parent */}
                <button className="btn btn-ghost btn-xs text-info" onClick={() => onEdit(task)}>Edit</button>
                <button className="btn btn-ghost btn-xs text-error" onClick={() => onDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}