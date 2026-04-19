"use client";

import { useState } from "react";
import {
  LayoutGrid,
  List,
  Calendar,
  Users,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  Circle,
  AlertCircle,
  ChevronDown,
  Download,
  MoreVertical,
} from "lucide-react";
import { sampleTasks, filterTasks, sortTasks, getTasksByStatus, getTasksByAgent, Task } from "@/lib/tasks";

type ViewMode = "kanban" | "list" | "timeline" | "agent";

export default function TasksPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    priority: "all",
    assigned: "all",
  });
  const [sortBy, setSortBy] = useState("priority");

  // Process tasks
  const filteredTasks = filterTasks(sampleTasks, filters);
  const sortedTasks = sortTasks(
    filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    sortBy
  );
  const tasksByStatus = getTasksByStatus(sortedTasks);
  const tasksByAgent = getTasksByAgent(sortedTasks);

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-300";
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle size={18} className="text-green-600" />;
      case "in-progress":
        return <Clock size={18} className="text-blue-600" />;
      default:
        return <Circle size={18} className="text-gray-400" />;
    }
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {getStatusIcon(task.status)}
          <h3 className="font-semibold text-gray-900 text-sm">{task.title}</h3>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical size={14} className="text-gray-600" />
        </button>
      </div>

      {task.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {task.priority && (
            <span className={`px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          )}
          {task.deadline && (
            <span className="text-gray-500 flex items-center gap-1">
              <Calendar size={12} />
              {task.deadline}
            </span>
          )}
        </div>
        {task.assigned && (
          <span className="text-gray-500 flex items-center gap-1">
            <Users size={12} />
            {task.assigned}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage all tasks from TASKS.md</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
            <Download size={18} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md">
            <Plus size={18} />
            New Task
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{sampleTasks.length}</p>
            </div>
            <LayoutGrid className="text-blue-600" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {tasksByStatus.pending.length}
              </p>
            </div>
            <Circle className="text-gray-400" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {tasksByStatus["in-progress"].length}
              </p>
            </div>
            <Clock className="text-blue-600" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {tasksByStatus.complete.length}
              </p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* View Modes */}
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "kanban"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              title="Kanban Board"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              title="List View"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "timeline"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              title="Timeline View"
            >
              <Calendar size={18} />
            </button>
            <button
              onClick={() => setViewMode("agent")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "agent"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              title="Agent View"
            >
              <Users size={18} />
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-600" />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="complete">Complete</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="priority">Sort: Priority</option>
              <option value="deadline">Sort: Deadline</option>
              <option value="created">Sort: Created</option>
              <option value="agent">Sort: Agent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Views */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Circle size={18} className="text-gray-400" />
                To Do
              </h3>
              <span className="text-sm text-gray-500">
                {tasksByStatus.pending.length}
              </span>
            </div>
            <div className="space-y-3">
              {tasksByStatus.pending.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                In Progress
              </h3>
              <span className="text-sm text-gray-500">
                {tasksByStatus["in-progress"].length}
              </span>
            </div>
            <div className="space-y-3">
              {tasksByStatus["in-progress"].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Done */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                Done
              </h3>
              <span className="text-sm text-gray-500">
                {tasksByStatus.complete.length}
              </span>
            </div>
            <div className="space-y-3">
              {tasksByStatus.complete.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === "list" && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Task
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Priority
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Deadline
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Assigned
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <p className="text-xs text-gray-500">{task.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-600 capitalize">{task.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    {task.priority && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {task.deadline || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {task.assigned || "Unassigned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "timeline" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-6">April 2026 Timeline</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-8 h-0.5 bg-gray-200"></div>
            
            {/* Timeline items */}
            <div className="grid grid-cols-10 gap-4">
              {Array.from({ length: 10 }, (_, i) => {
                const day = 19 + i;
                const dayTasks = sortedTasks.filter((task) => {
                  if (!task.deadline) return false;
                  const taskDate = new Date(task.deadline);
                  return (
                    taskDate.getDate() === day &&
                    taskDate.getMonth() === 3 &&
                    taskDate.getFullYear() === 2026
                  );
                });

                return (
                  <div key={day} className="relative">
                    <div className="text-xs text-gray-500 mb-2 text-center">{day}</div>
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 mx-auto flex items-center justify-center">
                      {dayTasks.length > 0 && (
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                    </div>
                    {dayTasks.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {dayTasks.map((task) => (
                          <div
                            key={task.id}
                            className={`text-xs p-1 rounded ${
                              task.status === "complete"
                                ? "bg-green-50 text-green-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {task.title.substring(0, 15)}...
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {viewMode === "agent" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(tasksByAgent).map(([agent, tasks]) => (
            <div key={agent} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Users className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{agent}</h3>
                  <p className="text-xs text-gray-500">{tasks.length} tasks</p>
                </div>
              </div>
              <div className="space-y-3">
                {tasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(task.status)}
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {task.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      {task.priority && (
                        <span
                          className={`px-2 py-0.5 rounded-full ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      )}
                      {task.deadline && (
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {task.deadline}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {tasks.length > 5 && (
                  <button className="text-sm text-blue-600 hover:underline w-full text-center">
                    View all {tasks.length} tasks →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
