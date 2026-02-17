import React, { useState, useMemo, useEffect, useCallback } from "react";
import { 
  Search, Plus, Zap, Bell, LayoutDashboard, Calendar, 
  MoreHorizontal, Menu, X, ChevronDown, List, Settings,
  BarChart3, Layers, Filter, ArrowUp, ArrowDown, Minus,
  CheckCircle2, CheckSquare, LogOut, Loader2, Trash2
} from "lucide-react";

// --- API Configuration ---
const API_BASE_URL = "http://localhost:8000/api"; // Update with your Django server URL

// --- API Helper Functions ---
const api = {
  async getTasks(userId) {
    const response = await fetch(`${API_BASE_URL}/tasks/?user_id=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  },

  async createTask(taskData) {
    const response = await fetch(`${API_BASE_URL}/tasks/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  },

  async updateTaskStatus(taskId, newStatus) {
    const response = await fetch(`${API_BASE_URL}/tasks/update-status/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_id: taskId, status: newStatus }),
    });
    if (!response.ok) throw new Error("Failed to update task status");
    return response.json();
  },

  async incrementSubtask(taskId, currentCompleted, currentTotal) {
    const response = await fetch(`${API_BASE_URL}/tasks/increment-subtask/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        task_id: taskId, 
        subtasks_completed: Math.min(currentCompleted + 1, currentTotal)
      }),
    });
    if (!response.ok) throw new Error("Failed to increment subtask");
    return response.json();
  },

  async deleteTask(taskId) {
    const response = await fetch(`${API_BASE_URL}/tasks/delete/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_id: taskId }),
    });
    if (!response.ok) throw new Error("Failed to delete task");
    return response.json();
  }
};

// --- Reusable Components ---

// 1. Header Component
const Header = ({ onNewTask, onQuickSprint, user, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side: Title & Mobile Menu */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
             <div className="p-2 bg-gray-100 rounded-lg">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M12 1.5C12 1.5 3 6.75 3 12.75C3 18.75 12 22.5 12 22.5C12 22.5 21 18.75 21 12.75C21 6.75 12 1.5 12 1.5Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </div>
             <div>
               <span className="text-sm font-semibold text-gray-900">{user?.name || "Your Dashboard"}</span>
               <span className="block text-xs text-gray-500">Sprint 12 - January 2026</span>
             </div>
          </div>
        </div>
        
        {/* Center: Search */}
        <div className="flex-1 max-w-xl mx-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks, sprints..."
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
        </div>
        
        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={onNewTask}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
          <button 
            onClick={onQuickSprint}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
          >
            <Zap className="w-4 h-4" />
            <span className="hidden lg:inline">Quick Sprint</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={onLogout}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </header>
  );
};

// 2. Filter Bar Component
const FilterBar = ({ 
  searchTerm, onSearch, 
  priority, onPriorityChange, 
  viewMode, onSetViewMode, 
  taskCount 
}) => {
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const priorities = ["All", "High", "Medium", "Low"];

  return (
    <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700 text-sm font-medium">Filter</span>
          </button>
          
          {/* Priority Filter Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => setIsPriorityOpen(!isPriorityOpen)}
              className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 w-full"
            >
              <span className="text-gray-700 text-sm font-medium">
                {priority === "All" ? "All Priority" : `${priority} Priority`}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isPriorityOpen ? 'rotate-180' : ''}`} />
            </button>
            {isPriorityOpen && (
              <div className="absolute z-10 top-full mt-1 w-full sm:w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                {priorities.map(p => (
                  <button 
                    key={p}
                    onClick={() => { onPriorityChange(p); setIsPriorityOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {p} Priority
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 w-full sm:w-auto justify-center">
            <span className="text-gray-700 text-sm font-medium">All Members</span>
          </button>
        </div>

        {/* View Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{taskCount} Tasks</span>
          <button 
            onClick={() => onSetViewMode('kanban')}
            className={`p-2 rounded ${viewMode === 'kanban' ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
          >
            <LayoutDashboard className={`w-5 h-5 ${viewMode === 'kanban' ? 'text-indigo-600' : 'text-gray-600'}`} />
          </button>
          <button 
            onClick={() => onSetViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
          >
            <List className={`w-5 h-5 ${viewMode === 'list' ? 'text-indigo-600' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Task Card Component
const TaskCard = ({ task, onDragStart, onViewTask }) => {
  const priorityIcons = {
    High: <ArrowUp className="w-4 h-4 text-red-600" />,
    Medium: <Minus className="w-4 h-4 text-yellow-600" />,
    Low: <ArrowDown className="w-4 h-4 text-green-600" />,
  };
  
  const priorityColors = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-yellow-50 text-yellow-600",
    Low: "bg-green-50 text-green-600",
  };
  
  const progressPercent = task.subtasks.total > 0 
    ? (task.subtasks.completed / task.subtasks.total) * 100 
    : task.progress;

  return (
    <div 
      draggable
      onDragStart={onDragStart}
      onClick={onViewTask}
      className="relative bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:cursor-grabbing"
    >
      {/* Circular Progress */}
      {task.isWIP && (
         <div className="absolute top-4 right-4 w-6 h-6">
           <svg className="w-full h-full" viewBox="0 0 20 20">
             <circle className="text-gray-200" strokeWidth="2" stroke="currentColor" fill="transparent" r="8" cx="10" cy="10"/>
             <circle 
               className="text-indigo-600" 
               strokeWidth="2" 
               strokeDasharray={`${progressPercent * (2 * Math.PI * 8) / 100}, 100`}
               strokeLinecap="round" 
               stroke="currentColor" 
               fill="transparent" 
               r="8" 
               cx="10" 
               cy="10"
               style={{transform: 'rotate(-90deg)', transformOrigin: '50% 50%'}}
             />
           </svg>
         </div>
      )}
      {task.progress === 100 && !task.isWIP && (
        <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-green-600" />
      )}
      
      <h4 className="text-sm font-medium text-gray-900 mb-3 pr-8">{task.title}</h4>
      
      {/* Subtasks Progress */}
      {task.subtasks.total > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-600">Subtasks</span>
            <span className="text-xs font-medium text-gray-500">{task.subtasks.completed}/{task.subtasks.total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-3">
        {/* Priority & Date */}
        <div className="flex items-center gap-2">
           <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-md ${priorityColors[task.priority]}`}>
             {priorityIcons[task.priority]}
             {task.priority}
           </span>
           <div className="flex items-center gap-1 text-xs text-gray-500">
             <Calendar className="w-3 h-3" />
             <span>{task.dueDate}</span>
           </div>
        </div>
        
        {/* Avatar */}
        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium">
          {task.title.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

// 4. Kanban Column Component
const KanbanColumn = ({ column, tasks, onDragOver, onDrop, onDragStart, onViewTask }) => {
  return (
    <div 
      className={`rounded-lg p-4 min-h-[300px] ${column.id === 'progress' ? 'bg-indigo-50/50' : 'bg-gray-50/70'}`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{column.title}</h3>
        </div>
        <span className="text-sm font-medium text-gray-500 bg-gray-200 px-2.5 py-0.5 rounded-full">{tasks.length}</span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task}
            onDragStart={(e) => onDragStart(e, task.id, column.id)}
            onViewTask={() => onViewTask(task)}
          />
        ))}
      </div>
    </div>
  );
};

// 5. Kanban View Component
const KanbanView = ({ columns, onDragStart, onDragOver, onDrop, onViewTask }) => {
  return (
    <div className="px-4 sm:px-6 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {Object.values(columns).map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          tasks={column.tasks}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, column.id)}
          onDragStart={onDragStart}
          onViewTask={onViewTask}
        />
      ))}
    </div>
  );
};

// 6. List View Component
const ListView = ({ columns, onViewTask }) => {
  const allTasks = Object.values(columns).flatMap(col => 
    col.tasks.map(task => ({ ...task, status: col.title }))
  );
  
  const priorityColors = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-yellow-50 text-yellow-600",
    Low: "bg-green-50 text-green-600",
  };
  
  const statusColors = {
    "TO DO": "bg-gray-100 text-gray-600",
    "IN PROGRESS": "bg-blue-100 text-blue-600",
    "REVIEW": "bg-purple-100 text-purple-600",
    "DONE": "bg-green-100 text-green-600",
  };

  return (
    <div className="px-4 sm:px-6 pb-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allTasks.map(task => (
              <tr 
                key={task.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onViewTask(task)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{task.title}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[task.status]}`}>{task.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                   {task.subtasks.total > 0 
                     ? `${task.subtasks.completed}/${task.subtasks.total} Subtasks`
                     : `${task.progress}%`
                   }
                 </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{task.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium">
                    {task.title.charAt(0).toUpperCase()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 7. New Task Modal Component
const TaskModal = ({ isOpen, onClose, onAddTask, userId }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [subtaskCount, setSubtaskCount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const newDate = dueDate 
        ? new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
        : "N/A";
      const totalSubtasks = parseInt(subtaskCount) || 0;

      const taskData = {
        user_id: userId,
        title,
        priority,
        status: "todo", // Default status
        due_date: newDate,
        subtasks_total: totalSubtasks,
      };

      await onAddTask(taskData);
      
      // Reset form
      setTitle("");
      setPriority("Medium");
      setDueDate("");
      setSubtaskCount("");
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">New Task</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" disabled={isSubmitting}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Implement new feature"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                disabled={isSubmitting}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Subtasks</label>
              <input 
                type="number"
                value={subtaskCount}
                onChange={(e) => setSubtaskCount(e.target.value)}
                placeholder="e.g., 5"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input 
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium text-sm"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 8. Task Detail Modal Component
const TaskDetailModal = ({ task, onClose, onIncrementSubtask, onDeleteTask }) => {
  const [isIncrementing, setIsIncrementing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!task) return null;

  const priorityColors = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-yellow-50 text-yellow-600",
    Low: "bg-green-50 text-green-600",
  };
  
  const progressPercent = task.subtasks.total > 0 
    ? (task.subtasks.completed / task.subtasks.total) * 100 
    : task.progress;
    
  const canIncrement = task.subtasks.total > 0 && task.subtasks.completed < task.subtasks.total;

  const handleIncrement = async () => {
    setIsIncrementing(true);
    try {
      await onIncrementSubtask(task.id);
    } catch (error) {
      console.error("Error incrementing subtask:", error);
      alert("Failed to update subtask. Please try again.");
    } finally {
      setIsIncrementing(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setIsDeleting(true);
    try {
      await onDeleteTask(task.id);
      onClose();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Assignee</label>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium">
                  {task.title.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-800">You</span> 
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Due Date</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-800">{task.dueDate}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Priority</label>
              <span className={`text-sm px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
            </div>
          </div>
          
          {/* Subtasks Progress */}
          {task.subtasks.total > 0 && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Subtasks Progress</label>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {task.subtasks.completed} of {task.subtasks.total} completed
                </span>
                <span className="text-sm font-medium text-gray-500">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={handleIncrement}
              disabled={!canIncrement || isIncrementing || isDeleting}
              className={`flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm
                ${!canIncrement || isIncrementing || isDeleting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isIncrementing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckSquare className="w-4 h-4" />
              )}
              <span>{isIncrementing ? "Updating..." : "Complete One Subtask"}</span>
            </button>
            
            <button 
              type="button" 
              onClick={handleDelete}
              disabled={isDeleting || isIncrementing}
              className={`flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm
                ${isDeleting || isIncrementing ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              <span>{isDeleting ? "Deleting..." : "Delete Task"}</span>
            </button>
          </div>
          
          <button 
            type="button" 
            onClick={onClose}
            disabled={isDeleting || isIncrementing}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// 9. Loading Component
const LoadingSpinner = () => (
  <div className="h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Loading your tasks...</p>
    </div>
  </div>
);

// --- Main Dashboard Component ---

export default function Dashboard({ user, onLogout }) {
  const [columns, setColumns] = useState({
    todo: { id: "todo", title: "TO DO", tasks: [] },
    progress: { id: "progress", title: "IN PROGRESS", tasks: [] },
    review: { id: "review", title: "REVIEW", tasks: [] },
    done: { id: "done", title: "DONE", tasks: [] },
  });
  
  const [modalTargetColumn, setModalTargetColumn] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [viewMode, setViewMode] = useState("kanban");
  const [draggingTask, setDraggingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getTasks(user.id);
      
      // Transform API data to column structure
      const newColumns = {
        todo: { id: "todo", title: "TO DO", tasks: data.todo || [] },
        progress: { id: "progress", title: "IN PROGRESS", tasks: data.progress || [] },
        review: { id: "review", title: "REVIEW", tasks: data.review || [] },
        done: { id: "done", title: "DONE", tasks: data.done || [] },
      };
      
      setColumns(newColumns);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Failed to load tasks. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // --- Load Tasks on Mount ---
  useEffect(() => {
    if (user?.id) {
      loadTasks();
    }
  }, [user?.id, loadTasks]);

  // --- Filtering Logic ---
  const filteredColumns = useMemo(() => {
    const newColumns = JSON.parse(JSON.stringify(columns));
    let totalTasks = 0;
    
    for (const columnId in newColumns) {
      const column = newColumns[columnId];
      column.tasks = column.tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
        return matchesSearch && matchesPriority;
      });
      totalTasks += column.tasks.length;
    }
    
    return { filteredData: newColumns, totalTasks };
  }, [columns, searchTerm, priorityFilter]);

  // --- Drag & Drop Handlers ---
  const handleDragStart = (e, taskId, sourceColumnId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
    setDraggingTask({ taskId, sourceColumnId });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDragEnd = () => {
    setDraggingTask(null);
  };

  const handleDrop = async (e, targetColumnId) => {
    e.preventDefault();
    if (!draggingTask) {
      return;
    }
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");

    if (sourceColumnId === targetColumnId) {
      setDraggingTask(null);
      return;
    }

    try {
      // Update on backend first
      await api.updateTaskStatus(taskId, targetColumnId);
      
      // Then update local state
      let taskToMove;
      const newColumns = { ...columns };
      const sourceTasks = [...newColumns[sourceColumnId].tasks];
      const taskIndex = sourceTasks.findIndex(task => task.id === taskId);
      
      if (taskIndex > -1) {
        taskToMove = sourceTasks.splice(taskIndex, 1)[0];
        taskToMove.isWIP = (targetColumnId === 'progress');
        
        if (targetColumnId === 'done') {
          taskToMove.progress = 100;
          if (taskToMove.subtasks.total > 0) {
            taskToMove.subtasks.completed = taskToMove.subtasks.total;
          }
        }

        newColumns[sourceColumnId] = {
          ...newColumns[sourceColumnId],
          tasks: sourceTasks
        };
        
        const targetTasks = [...newColumns[targetColumnId].tasks];
        targetTasks.push(taskToMove);
        newColumns[targetColumnId] = {
          ...newColumns[targetColumnId],
          tasks: targetTasks
        };
        
        setColumns(newColumns);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to move task. Please try again.");
      // Reload tasks to sync with server
      loadTasks();
    }
    
    setDraggingTask(null);
  };

  // --- Task Handlers ---
  const handleModalSave = async (taskData) => {
    try {
      await api.createTask(taskData);
      // Reload tasks to get the new task with server-generated ID
      await loadTasks();
    } catch (error) {
      console.error("Error creating task:", error);
      throw error; // Let modal handle the error
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };
  
  const handleIncrementSubtask = async (taskId) => {
    try {
      // Find the task to get current subtask count
      let currentTask = null;
      for (const col of Object.values(columns)) {
        currentTask = col.tasks.find(t => t.id === taskId);
        if (currentTask) break;
      }
      
      if (!currentTask) return;
      
      await api.incrementSubtask(
        taskId, 
        currentTask.subtasks.completed, 
        currentTask.subtasks.total
      );
      
      // Update local state
      const newColumns = JSON.parse(JSON.stringify(columns));
      for (const columnId in newColumns) {
        const taskIndex = newColumns[columnId].tasks.findIndex(t => t.id === taskId);
        if (taskIndex > -1) {
          const task = newColumns[columnId].tasks[taskIndex];
          if (task.subtasks.total > 0 && task.subtasks.completed < task.subtasks.total) {
            task.subtasks.completed += 1;
            task.progress = Math.round((task.subtasks.completed / task.subtasks.total) * 100);
            newColumns[columnId].tasks[taskIndex] = task;
            setSelectedTask(task);
            break;
          }
        }
      }
      setColumns(newColumns);
    } catch (error) {
      console.error("Error incrementing subtask:", error);
      throw error; // Let modal handle the error
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.deleteTask(taskId);
      
      // Remove task from local state
      const newColumns = JSON.parse(JSON.stringify(columns));
      for (const columnId in newColumns) {
        const taskIndex = newColumns[columnId].tasks.findIndex(t => t.id === taskId);
        if (taskIndex > -1) {
          newColumns[columnId].tasks.splice(taskIndex, 1);
          break;
        }
      }
      setColumns(newColumns);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error; // Let modal handle the error
    }
  };

  // --- Render Loading State ---
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // --- Render Error State ---
  if (error) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadTasks}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden h-full">
        <Header 
          onNewTask={() => setModalTargetColumn('todo')}
          onQuickSprint={() => setModalTargetColumn('progress')}
          user={user}
          onLogout={onLogout}
        />
        
        <div className="flex-1 flex flex-col overflow-y-auto">
          <FilterBar 
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            priority={priorityFilter}
            onPriorityChange={setPriorityFilter}
            viewMode={viewMode}
            onSetViewMode={setViewMode}
            taskCount={filteredColumns.totalTasks}
          />

          <div 
            className="flex-1 overflow-y-auto"
            onDragEnd={handleDragEnd}
          >
            {viewMode === 'kanban' ? (
              <KanbanView 
                columns={filteredColumns.filteredData}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onViewTask={handleViewTask}
              />
            ) : (
              <ListView 
                columns={filteredColumns.filteredData}
                onViewTask={handleViewTask}
              />
            )}
          </div>
        </div>
      </main>

      {/* Modal for Creating New Tasks */}
      <TaskModal 
        isOpen={modalTargetColumn !== null}
        onClose={() => setModalTargetColumn(null)}
        onAddTask={handleModalSave}
        userId={user?.id}
      />
      
      {/* Modal for Viewing Task Details */}
      <TaskDetailModal 
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onIncrementSubtask={handleIncrementSubtask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
