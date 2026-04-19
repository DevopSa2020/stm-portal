"use client";

import { useEffect } from "react";

export default function SystemPage() {
  useEffect(() => {
    // Load Mermaid dynamically
    const loadMermaid = async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({ 
        startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
      });
    };
    loadMermaid();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          🧠 Stan's Inner System
        </h2>
        <p className="text-gray-600">
          Visual diagrams showing how Stan works under the hood
        </p>
      </div>

      {/* Architecture Diagram */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          1. Agent Architecture
        </h3>
        <p className="text-gray-600 mb-4">
          How Stan interacts with subagents and tools
        </p>
        <div className="mermaid bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`flowchart TD
    A[Sam] -->|Tasks| B[Stan - Main Agent]
    B -->|Spawn| C[Subagent 1]
    B -->|Spawn| D[Subagent 2]
    B -->|Spawn| E[Subagent N]
    C -->|Tools| F[read/write/edit]
    C -->|Tools| G[exec/process]
    C -->|Tools| H[web search]
    D -->|Tools| F
    D -->|Tools| G
    E -->|Tools| H
    C -->|Results| B
    D -->|Results| B
    E -->|Results| B
    B -->|Delivery| A`}
        </div>
      </section>

      {/* Memory Layers */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          2. Memory Layers (4-Layer System)
        </h3>
        <p className="text-gray-600 mb-4">
          How Stan remembers and forgets information
        </p>
        <div className="mermaid bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`flowchart BT
    A[Session Context<br/>Temporary RAM] -->|Important| B[Daily Notes<br/>memory/YYYY-MM-DD.md]
    B -->|Curated| C[MEMORY.md<br/>Long-term Memory]
    C -->|Skills| D[SOUL.md/AGENTS.md<br/>Identity & Rules]
    style A fill:#fee2e2
    style B fill:#fef3c7
    style C fill:#dbeafe
    style D fill:#dcfce7`}
        </div>
        <div className="mt-4 grid md:grid-cols-4 gap-4">
          <div className="p-3 bg-red-50 rounded-lg">
            <h4 className="font-medium text-red-900">Session Context</h4>
            <p className="text-xs text-red-700 mt-1">Temporary, lost on restart</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900">Daily Notes</h4>
            <p className="text-xs text-yellow-700 mt-1">Raw logs of the day</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">MEMORY.md</h4>
            <p className="text-xs text-blue-700 mt-1">Curated long-term memory</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900">Identity Files</h4>
            <p className="text-xs text-green-700 mt-1">Core rules & personality</p>
          </div>
        </div>
      </section>

      {/* Decision Tree */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          3. Decision Tree
        </h3>
        <p className="text-gray-600 mb-4">
          How Stan decides what to do
        </p>
        <div className="mermaid bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`flowchart TD
    A[User Request] --> B{Read SOUL.md?}
    B -->|Yes| C[Follow Identity Rules]
    B -->|No| D[Check Skills]
    C --> E{Task Type?}
    D --> E
    E -->|File Ops| F[Use read/write/edit]
    E -->|Shell| G[Use exec/process]
    E -->|Web| H[Use web search/fetch]
    E -->|Complex| I[Spawn Subagent]
    F --> J{Safe?}
    G --> J
    H --> J
    I --> J
    J -->|Yes| K[Execute]
    J -->|No| L[Ask User]
    K --> M[Report Results]
    L --> M`}
        </div>
      </section>

      {/* Task Flow */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          4. Task Lifecycle
        </h3>
        <p className="text-gray-600 mb-4">
          End-to-end flow from request to completion
        </p>
        <div className="mermaid bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`sequenceDiagram
    participant Sam
    participant Stan
    participant Subagent
    participant Tools
    
    Sam->>Stan: Task Request
    Stan->>Stan: Read SOUL.md
    Stan->>Stan: Check Skills
    alt Complex Task
        Stan->>Subagent: Spawn with Context
        Subagent->>Tools: Execute Work
        Tools-->>Subagent: Results
        Subagent-->>Stan: Auto-announce Done
    else Simple Task
        Stan->>Tools: Execute Directly
        Tools-->>Stan: Results
    end
    Stan->>Sam: Deliver Results`}
        </div>
      </section>

      {/* Retention Funnel */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          5. Memory Retention Funnel
        </h3>
        <p className="text-gray-600 mb-4">
          What gets remembered vs forgotten
        </p>
        <div className="mermaid bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`flowchart TD
    A[All Interactions<br/>~10,000 tokens/day] -->|Filter 1| B[Important Events<br/>~1,000 tokens]
    B -->|Filter 2| C[Daily Notes<br/>~500 tokens]
    C -->|Filter 3| D[MEMORY.md<br/>~100 tokens]
    D -->|Filter 4| E[SOUL.md Updates<br/>~10 tokens]
    
    style A fill:#fee2e2,stroke:#ef4444
    style B fill:#fef3c7,stroke:#f59e0b
    style C fill:#dbeafe,stroke:#3b82f6
    style D fill:#dcfce7,stroke:#10b981
    style E fill:#f3e8ff,stroke:#7c3aed`}
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Retention Rules</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✅ <strong>Remember:</strong> Decisions, lessons, preferences, important facts</li>
            <li>❌ <strong>Forget:</strong> Routine messages, temporary context, secrets (unless asked)</li>
            <li>🔄 <strong>Review:</strong> Daily notes → MEMORY.md (every few days via heartbeat)</li>
          </ul>
        </div>
      </section>

      {/* Agent Interaction */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          6. Multi-Agent System
        </h3>
        <p className="text-gray-600 mb-4">
          How specialized agents collaborate
        </p>
        <div className="mermaid bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`flowchart LR
    A[Stan<br/>Main Agent] --> B[Professor<br/>Research]
    A --> C[Designer<br/>UI/UX]
    A --> D[DeepThroat<br/>News Filter]
    A --> E[DevOps<br/>Infrastructure]
    
    B -->|Findings| A
    C -->|Designs| A
    D -->|Filtered News| A
    E -->|Deployments| A
    
    style A fill:#2563eb,color:#fff
    style B fill:#7c3aed,color:#fff
    style C fill:#ec4899,color:#fff
    style D fill:#f59e0b,color:#fff
    style E fill:#10b981,color:#fff`}
        </div>
      </section>
    </div>
  );
}
