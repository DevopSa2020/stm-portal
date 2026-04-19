export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "complete";
  category: "Core Identity" | "Infrastructure" | "Business" | "Ongoing" | "Daily" | "Weekly" | "One-Time" | "Conditional";
  priority?: "critical" | "high" | "medium" | "low";
  deadline?: string;
  assigned?: string;
  dateCreated: string;
  dateCompleted?: string;
  tags?: string[];
}

export interface TaskGroup {
  date: string;
  tasks: Task[];
}

// Parse TASKS.md format
export function parseTasks(markdown: string): Task[] {
  const tasks: Task[] = [];
  const lines = markdown.split("\n");
  let currentGroup = "";
  let taskId = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match task lines: - [ ] or - [x]
    const taskMatch = line.match(/^[-*] \[([ x])\] \*\*(.+?)\*\*(?: - (.+))?$/);
    if (taskMatch) {
      const [, checked, title, description] = taskMatch;
      const isComplete = checked.toLowerCase() === "x";
      
      // Extract metadata from description
      const deadlineMatch = description?.match(/\*\*Deadline:\*\* (.+?)(?:\n|$)/);
      const statusMatch = description?.match(/\*\*Status:\*\* (.+?)(?:\n|$)/);
      const priorityMatch = description?.match(/\*\*Priority:\*\* ([🟠🟡🟢]+) (.+?)(?:\n|$)/);
      const assignedMatch = description?.match(/\*\*Assigned:\*\* (.+?)(?:\n|$)/);
      
      // Determine category from context
      let category: Task["category"] = "Ongoing";
      if (currentGroup.includes("Core Identity")) category = "Core Identity";
      else if (currentGroup.includes("Infrastructure")) category = "Infrastructure";
      else if (currentGroup.includes("Business")) category = "Business";
      else if (currentGroup.includes("Daily")) category = "Daily";
      else if (currentGroup.includes("Weekly")) category = "Weekly";
      else if (currentGroup.includes("One-Time")) category = "One-Time";
      else if (currentGroup.includes("Conditional")) category = "Conditional";
      
      // Extract tags from description
      const tags: string[] = [];
      if (description?.includes("STM Portal")) tags.push("STM Portal");
      if (description?.includes("Azure")) tags.push("Azure");
      if (description?.includes("GitHub")) tags.push("GitHub");
      if (description?.includes("Report")) tags.push("Report");
      if (description?.includes("Security")) tags.push("Security");
      
      taskId++;
      tasks.push({
        id: `task-${taskId}`,
        title: title.trim(),
        description: description?.trim().split("\n")[0],
        status: isComplete ? "complete" : "pending",
        category,
        priority: priorityMatch ? priorityMatch[2].toLowerCase() as Task["priority"] : undefined,
        deadline: deadlineMatch ? deadlineMatch[1].trim() : undefined,
        assigned: assignedMatch ? assignedMatch[1].trim() : undefined,
        dateCreated: new Date().toISOString().split("T")[0],
        dateCompleted: isComplete ? new Date().toISOString().split("T")[0] : undefined,
        tags: tags.length > 0 ? tags : undefined,
      });
    }
    
    // Track section headers for category
    if (line.startsWith("### ")) {
      currentGroup = line.replace("### ", "");
    }
  }
  
  return tasks;
}

// Sample tasks for initial display (will be replaced by API call)
export const sampleTasks: Task[] = [
  {
    id: "task-1",
    title: "System Health Check + Report",
    description: "Check system health and create report for STM Portal",
    status: "pending",
    category: "Core Identity",
    priority: "high",
    deadline: "2026-04-19",
    assigned: "Stan",
    dateCreated: "2026-04-19",
    tags: ["Reports", "STM Portal"],
  },
  {
    id: "task-2",
    title: "Git Commit & Push All Changes",
    description: "Push 8 untracked files to GitHub",
    status: "pending",
    category: "Core Identity",
    priority: "critical",
    deadline: "2026-04-19",
    assigned: "Stan",
    dateCreated: "2026-04-19",
    tags: ["GitHub", "Infrastructure"],
  },
  {
    id: "task-3",
    title: "Fix Backend Services",
    description: "Restore ports 3000/3001 services",
    status: "pending",
    category: "Infrastructure",
    priority: "critical",
    deadline: "2026-04-19",
    assigned: "DevOps Engineer",
    dateCreated: "2026-04-19",
    tags: ["Azure", "Infrastructure"],
  },
  {
    id: "task-4",
    title: "HSC Code Audit",
    description: "Healing_Space_Center code review",
    status: "pending",
    category: "Business",
    priority: "high",
    deadline: "2026-04-19",
    assigned: "Stan",
    dateCreated: "2026-04-18",
    tags: ["Report", "Security"],
  },
  {
    id: "task-5",
    title: "Recruitment Agency Quote",
    description: "Send quote to Noura Al-Sufairi",
    status: "pending",
    category: "Business",
    priority: "high",
    deadline: "2026-04-19",
    assigned: "Stan",
    dateCreated: "2026-04-19",
    tags: ["Business"],
  },
  {
    id: "task-6",
    title: "Smart Index System",
    description: "Created index_day.py script",
    status: "complete",
    category: "Infrastructure",
    priority: "medium",
    dateCompleted: "2026-04-18",
    assigned: "Stan",
    dateCreated: "2026-04-18",
    tags: ["Infrastructure"],
  },
  {
    id: "task-7",
    title: "AWS Secrets Manager Setup",
    description: "Setup and then deprecated in favor of local vault",
    status: "complete",
    category: "Infrastructure",
    priority: "medium",
    dateCompleted: "2026-04-18",
    assigned: "Stan",
    dateCreated: "2026-04-18",
    tags: ["Security", "AWS"],
  },
  {
    id: "task-8",
    title: "Frontend Developer - STM Portal",
    description: "Build STM Portal from complete designs",
    status: "in-progress",
    category: "Infrastructure",
    priority: "high",
    deadline: "2026-04-23",
    assigned: "Frontend Developer",
    dateCreated: "2026-04-19",
    tags: ["STM Portal", "Azure"],
  },
];

// Filter and sort utilities
export function filterTasks(
  tasks: Task[],
  filters: {
    status?: string;
    category?: string;
    priority?: string;
    assigned?: string;
  }
): Task[] {
  return tasks.filter((task) => {
    if (filters.status && filters.status !== "all" && task.status !== filters.status) {
      return false;
    }
    if (filters.category && filters.category !== "all" && task.category !== filters.category) {
      return false;
    }
    if (filters.priority && filters.priority !== "all" && task.priority !== filters.priority) {
      return false;
    }
    if (filters.assigned && filters.assigned !== "all" && task.assigned !== filters.assigned) {
      return false;
    }
    return true;
  });
}

export function sortTasks(tasks: Task[], sortBy: string): Task[] {
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return (priorityOrder[a.priority || "low"] || 4) - (priorityOrder[b.priority || "low"] || 4);
      case "deadline":
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case "created":
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      case "agent":
        return (a.assigned || "").localeCompare(b.assigned || "");
      default:
        return 0;
    }
  });
}

export function getTasksByStatus(tasks: Task[]): Record<string, Task[]> {
  return {
    pending: tasks.filter((t) => t.status === "pending"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    complete: tasks.filter((t) => t.status === "complete"),
  };
}

export function getTasksByAgent(tasks: Task[]): Record<string, Task[]> {
  const byAgent: Record<string, Task[]> = {};
  tasks.forEach((task) => {
    const agent = task.assigned || "Unassigned";
    if (!byAgent[agent]) {
      byAgent[agent] = [];
    }
    byAgent[agent].push(task);
  });
  return byAgent;
}
