import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Lock,
  Key,
  Activity,
  Users,
  Globe,
  Server,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SecurityPage() {
  const securityMetrics = [
    {
      name: "Authentication",
      status: "secure",
      icon: Lock,
      details: "GitHub OAuth + Magic Link enabled",
    },
    {
      name: "Session Management",
      status: "secure",
      icon: Key,
      details: "24h timeout, max 3 devices",
    },
    {
      name: "IP Whitelisting",
      status: "active",
      icon: Globe,
      details: "Cloudflare Firewall Rules active",
    },
    {
      name: "Audit Logging",
      status: "active",
      icon: Activity,
      details: "All access logged and monitored",
    },
  ];

  const recentActivity = [
    {
      event: "Successful login",
      user: "Sam",
      ip: "185.46.212.97",
      location: "Riyadh, SA",
      time: "10 minutes ago",
      status: "success",
    },
    {
      event: "Session created",
      user: "Sam",
      ip: "185.46.212.97",
      location: "Riyadh, SA",
      time: "10 minutes ago",
      status: "success",
    },
    {
      event: "Failed login attempt",
      user: "Unknown",
      ip: "103.25.201.45",
      location: "Unknown",
      time: "2 hours ago",
      status: "blocked",
    },
    {
      event: "Password reset request",
      user: "Unknown",
      ip: "45.142.213.88",
      location: "Unknown",
      time: "5 hours ago",
      status: "blocked",
    },
  ];

  const activeSessions = [
    {
      device: "Desktop - Chrome",
      location: "Riyadh, Saudi Arabia",
      ip: "185.46.212.97",
      lastActive: "Now",
      current: true,
    },
    {
      device: "iPhone 15 Pro",
      location: "Riyadh, Saudi Arabia",
      ip: "185.46.212.98",
      lastActive: "2 hours ago",
      current: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your security settings</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
          <CheckCircle size={20} />
          <span className="font-medium">All Systems Secure</span>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics.map((metric) => (
          <div key={metric.name} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-blue-50 rounded-lg">
                <metric.icon className="text-blue-600" size={24} />
              </div>
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <h3 className="font-semibold text-gray-900 mt-4">{metric.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{metric.details}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Sessions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Active Sessions</h2>
          <div className="space-y-4">
            {activeSessions.map((session, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  session.current
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield
                      className={session.current ? "text-green-600" : "text-gray-600"}
                      size={24}
                    />
                    <div>
                      <p className="font-medium text-gray-900">{session.device}</p>
                      <p className="text-sm text-gray-600">{session.location}</p>
                      <p className="text-xs text-gray-500 mt-1">{session.ip}</p>
                    </div>
                  </div>
                  {session.current && (
                    <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs text-gray-600">
                    Last active: {session.lastActive}
                  </span>
                  {!session.current && (
                    <button className="text-xs text-red-600 hover:underline font-medium">
                      Revoke Session
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Lock className="text-blue-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Auth</p>
                  <p className="text-sm text-gray-600">GitHub OAuth protection</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="text-purple-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900">IP Whitelisting</p>
                  <p className="text-sm text-gray-600">Cloudflare Firewall</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Eye className="text-yellow-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Audit Logging</p>
                  <p className="text-sm text-gray-600">Track all access</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="text-red-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Max Devices</p>
                  <p className="text-sm text-gray-600">Limit to 3 devices</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <button className="w-full mt-4 py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors">
            Emergency Kill Switch - Invalidate All Sessions
          </button>
        </div>
      </div>

      {/* Recent Security Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Security Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Event
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  User
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  IP Address
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Location
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Time
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentActivity.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {activity.event}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{activity.user}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-mono">{activity.ip}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{activity.location}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{activity.time}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
