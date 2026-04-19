import Link from "next/link";
import {
  FileText,
  Newspaper,
  Activity,
  FolderOpen,
  MessageSquare,
  Projector,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    {
      label: "Total Reports",
      value: "89",
      change: "+12 this month",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "News Items Rated",
      value: "247",
      change: "+34 this week",
      trend: "up",
      icon: Newspaper,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "System Health",
      value: "94%",
      change: "All systems operational",
      trend: "stable",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Active Projects",
      value: "12",
      change: "3 due this week",
      trend: "up",
      icon: Projector,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const quickActions = [
    {
      title: "Read Newspaper",
      description: "Rate today's news items",
      icon: Newspaper,
      href: "/newspaper",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Browse Reports",
      description: "View all analysis work",
      icon: FileText,
      href: "/reports",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "System Health",
      description: "Check system status",
      icon: Activity,
      href: "/system",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Chat with Stan",
      description: "Start a conversation",
      icon: MessageSquare,
      href: "/chat",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const recentActivity = [
    { type: "report", label: "System Health Check completed", time: "2 hours ago" },
    { type: "news", label: "15 new items added to Newspaper", time: "4 hours ago" },
    { type: "project", label: "Azure Migration - Phase 2 started", time: "1 day ago" },
    { type: "file", label: "Q1 Financial Report uploaded", time: "2 days ago" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good morning, Sam</h1>
          <p className="text-gray-600 mt-1">{currentDate}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm">
          <Clock size={16} />
          <span>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} AST</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stats-card bg-white"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === "up" && (
                    <TrendingUp size={14} className="text-green-600" />
                  )}
                  <span className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-gray-500"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`${stat.color}`} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}>
                <action.icon className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{action.description}</p>
              <div className="flex items-center gap-1 mt-3 text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Open</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <Link href="/reports" className="text-sm text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex-shrink-0">
                  {activity.type === "report" && <CheckCircle size={20} className="text-green-600" />}
                  {activity.type === "news" && <Newspaper size={20} className="text-purple-600" />}
                  {activity.type === "project" && <Projector size={20} className="text-yellow-600" />}
                  {activity.type === "file" && <FolderOpen size={20} className="text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700">Gateway</span>
              </div>
              <span className="text-xs text-green-600 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700">Database</span>
              </div>
              <span className="text-xs text-green-600 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700">Cache</span>
              </div>
              <span className="text-xs text-green-600 font-medium">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700">Azure</span>
              </div>
              <span className="text-xs text-green-600 font-medium">Connected</span>
            </div>
          </div>
          
          <Link
            href="/system"
            className="block w-full mt-6 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg text-center transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
