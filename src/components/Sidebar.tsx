"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  FileText,
  Newspaper,
  FolderOpen,
  MessageSquare,
  Projector,
  Activity,
  Shield,
  Settings,
  Star,
  Clock,
} from "lucide-react";

interface NavSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  links: NavLink[];
  defaultExpanded?: boolean;
}

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

const navSections: NavSection[] = [
  {
    id: "main",
    title: "Main",
    icon: <LayoutDashboard size={18} />,
    defaultExpanded: true,
    links: [
      { href: "/", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
      { href: "/newspaper", label: "Newspaper", icon: <Newspaper size={16} /> },
      { href: "/reports", label: "Reports", icon: <FileText size={16} /> },
    ],
  },
  {
    id: "workspace",
    title: "Workspace",
    icon: <FolderOpen size={18} />,
    links: [
      { href: "/files", label: "Files", icon: <FolderOpen size={16} /> },
      { href: "/projects", label: "Projects", icon: <Projector size={16} /> },
      { href: "/chat", label: "Chat", icon: <MessageSquare size={16} /> },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    icon: <Activity size={18} />,
    links: [
      { href: "/system", label: "System Health", icon: <Activity size={16} /> },
      { href: "/security", label: "Security", icon: <Shield size={16} /> },
    ],
  },
];

const recentItems = [
  { href: "/newspaper", label: "📰 Newspaper #001" },
  { href: "/system", label: "🏥 System Health" },
];

const favoriteItems = [
  { href: "/", label: "📊 Dashboard" },
  { href: "/newspaper", label: "📰 Newspaper" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    main: true,
  });
  const pathname = usePathname();

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 z-50 transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">STM</span>
            </div>
            <span className="font-semibold text-gray-900">Portal</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={18} className="text-gray-600" />
          ) : (
            <ChevronLeft size={18} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navSections.map((section) => (
          <div key={section.id} className="mb-2">
            <button
              onClick={() => toggleSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors ${
                collapsed ? "justify-center px-2" : ""
              } hover:bg-gray-50`}
            >
              <span className="text-gray-600">{section.icon}</span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-left text-gray-700">{section.title}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${
                      expandedSections[section.id] ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>

            {!collapsed && expandedSections[section.id] && (
              <ul className="mt-1 space-y-0.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-2 ml-4 text-sm rounded-lg transition-colors ${
                        isActive(link.href)
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className={isActive(link.href) ? "text-blue-600" : "text-gray-400"}>
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {collapsed && (
              <div className="px-2 mt-1 space-y-1">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                      isActive(link.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    title={link.label}
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer - Recent & Favorites */}
      {!collapsed && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Recent */}
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
              <Clock size={12} />
              <span>Recent</span>
            </div>
            <ul className="space-y-1">
              {recentItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-sm text-gray-600 hover:text-gray-900 hover:underline truncate"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Favorites */}
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
              <Star size={12} />
              <span>Favorites</span>
            </div>
            <ul className="space-y-1">
              {favoriteItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-sm text-gray-600 hover:text-gray-900 hover:underline truncate"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
}
