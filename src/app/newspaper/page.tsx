"use client";

import { useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
}

const sampleNews: NewsItem[] = [
  {
    id: "saudi_ai_investment_20260419",
    title: "Saudi Arabia Announces $20B AI Investment Plan",
    summary: "The Kingdom unveils ambitious artificial intelligence strategy focusing on healthcare, finance, and smart cities.",
    date: "2026-04-19",
    category: "Technology"
  },
  {
    id: "neom_progress_20260418",
    title: "NEOM Project Reaches 40% Completion Milestone",
    summary: "Major infrastructure developments accelerate as THE LINE begins vertical construction phase.",
    date: "2026-04-18",
    category: "Business"
  },
  {
    id: "oil_prices_20260417",
    title: "Oil Prices Stabilize at $85/Barrel",
    summary: "OPEC+ production adjustments maintain market balance amid global economic recovery.",
    date: "2026-04-17",
    category: "Economy"
  },
  {
    id: "tech_hub_riyadh_20260416",
    title: "Riyadh Tech Hub Attracts 500+ Startups",
    summary: "New innovation district becomes regional leader in fintech and AI development.",
    date: "2026-04-16",
    category: "Technology"
  }
];

export default function NewspaperPage() {
  const [ratings, setRatings] = useState<Record<string, "like" | "dislike" | "save">>({});

  const handleRating = (newsId: string, action: "like" | "dislike" | "save") => {
    setRatings(prev => ({
      ...prev,
      [newsId]: action
    }));
    
    // In production, this would call the DeepThroat API
    console.log(`Rating: ${newsId} -> ${action}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">
          📰 Interactive Newspaper
        </h2>
        <div className="text-sm text-gray-600">
          {Object.keys(ratings).length} items rated today
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-devop-blue p-4">
        <p className="text-sm text-gray-700">
          <strong>How it works:</strong> Rate each news item to help DeepThroat learn your preferences. 
          Your feedback shapes future news filtering and recommendations.
        </p>
      </div>

      <div className="space-y-4">
        {sampleNews.map((item) => (
          <article 
            key={item.id}
            className="news-card bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="inline-block px-3 py-1 bg-devop-purple text-white text-xs rounded-full mb-2">
                  {item.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>
            
            <p className="text-gray-600 mb-4">{item.summary}</p>
            
            <div className="rating-actions">
              <button
                onClick={() => handleRating(item.id, "like")}
                className={`rating-btn btn-like ${ratings[item.id] === "like" ? "active" : ""}`}
              >
                👍 <span>Helpful</span>
              </button>
              <button
                onClick={() => handleRating(item.id, "dislike")}
                className={`rating-btn btn-dislike ${ratings[item.id] === "dislike" ? "active" : ""}`}
              >
                👎 <span>Not Helpful</span>
              </button>
              <button
                onClick={() => handleRating(item.id, "save")}
                className={`rating-btn btn-save ${ratings[item.id] === "save" ? "active" : ""}`}
              >
                💾 <span>Save</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Your Preferences Dashboard</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Top Categories</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Technology: 78% positive</li>
              <li>Business: 65% positive</li>
              <li>Economy: 52% positive</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Learning Status</h4>
            <p className="text-sm text-gray-600">
              DeepThroat is actively learning from your ratings. 
              Preference model updated 2 hours ago.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
