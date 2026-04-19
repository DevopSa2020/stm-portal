"use client";

import { useState } from "react";

interface Report {
  id: string;
  title: string;
  type: "website" | "bot" | "server";
  grade: "EXCELLENT" | "A+" | "A" | "A-" | "B+" | "B" | "B-";
  date: string;
  description: string;
}

const sampleReports: Report[] = [
  {
    id: "rpt_001",
    title: "DevOp.com.sa Infrastructure Audit",
    type: "server",
    grade: "EXCELLENT",
    date: "2026-04-18",
    description: "Complete security and performance review of production infrastructure"
  },
  {
    id: "rpt_002",
    title: "Telegram Bot Performance Analysis",
    type: "bot",
    grade: "A+",
    date: "2026-04-17",
    description: "Response time optimization and user engagement metrics"
  },
  {
    id: "rpt_003",
    title: "STM Portal UX Review",
    type: "website",
    grade: "A",
    date: "2026-04-16",
    description: "User experience audit with recommendations for improvement"
  },
  {
    id: "rpt_004",
    title: "Cloud Migration Strategy",
    type: "server",
    grade: "A+",
    date: "2026-04-15",
    description: "AWS to Azure migration plan with cost-benefit analysis"
  },
  {
    id: "rpt_005",
    title: "Customer Support Bot Enhancement",
    type: "bot",
    grade: "A-",
    date: "2026-04-14",
    description: "NLP improvements and conversation flow optimization"
  },
  {
    id: "rpt_006",
    title: "E-commerce Platform Security Review",
    type: "website",
    grade: "B+",
    date: "2026-04-13",
    description: "Vulnerability assessment and remediation roadmap"
  }
];

const gradeColors: Record<string, string> = {
  "EXCELLENT": "grade-excellent",
  "A+": "grade-a-plus",
  "A": "grade-a",
  "A-": "grade-a-minus",
  "B+": "grade-b-plus",
  "B": "bg-blue-400",
  "B-": "bg-blue-300"
};

export default function ReportsPage() {
  const [filter, setFilter] = useState<"all" | "website" | "bot" | "server">("all");
  const [search, setSearch] = useState("");

  const filteredReports = sampleReports.filter(report => {
    const matchesFilter = filter === "all" || report.type === filter;
    const matchesSearch = report.title.toLowerCase().includes(search.toLowerCase()) ||
                         report.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">
          📊 Reports Showcase
        </h2>
        <div className="text-sm text-gray-600">
          {filteredReports.length} of {sampleReports.length} reports
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-devop-blue focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all" 
                  ? "bg-devop-blue text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("website")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "website" 
                  ? "bg-devop-blue text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Websites
            </button>
            <button
              onClick={() => setFilter("bot")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "bot" 
                  ? "bg-devop-blue text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Bots
            </button>
            <button
              onClick={() => setFilter("server")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "server" 
                  ? "bg-devop-blue text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Servers
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="reports-grid">
        {filteredReports.map((report) => (
          <div key={report.id} className="report-card">
            <div className="flex justify-between items-start mb-3">
              <span className={`grade-badge ${gradeColors[report.grade] || "bg-gray-400"}`}>
                {report.grade}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {report.type}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {report.title}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              {report.description}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{report.date}</span>
              <div className="flex gap-2">
                <button className="text-sm text-devop-blue hover:underline">
                  View
                </button>
                <button className="text-sm text-devop-purple hover:underline">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No reports found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
