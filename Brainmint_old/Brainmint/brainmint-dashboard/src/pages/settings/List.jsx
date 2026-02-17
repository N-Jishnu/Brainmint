import React, { useState } from "react";

const listData = [
  {
    id: 1,
    typeChecked: true,
    key: "LEARNJIRA-1",
    summary: "Security & permissions: How to control who can edit or ...",
    status: "TO DO",
    assigneeInitials: "SK",
  },
  {
    id: 2,
    typeChecked: true,
    key: "LEARNJIRA-2",
    summary: "Plans: How to use detailed roadmaps to plan out your w...",
    status: "TO DO",
    assigneeInitials: "SK",
  },
  {
    id: 3,
    typeChecked: true,
    key: "LEARNJIRA-3",
    summary: "Atlassian Intelligence: How to work smarter with AI",
    status: "TO DO",
    assigneeInitials: "SK",
  },
];

const StatusBadge = ({ text }) => (
  <div
    style={{
      backgroundColor: "#E7E9EC",
      color: "#3b82f6",
      fontWeight: 600,
      fontSize: 12,
      borderRadius: 12,
      padding: "2px 10px",
      width: 60,
      textAlign: "center",
    }}
  >
    {text}
  </div>
);

const Avatar = ({ initials }) => (
  <div
    style={{
      width: 26,
      height: 26,
      borderRadius: "50%",
      backgroundColor: "#2563EB",
      color: "white",
      fontWeight: 600,
      fontSize: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {initials}
  </div>
);

export default function ListView() {
  const [search, setSearch] = useState("");

  const filtered = listData.filter(
    (item) =>
      item.key.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial, sans-serif",
        fontSize: 14,
        color: "#202124",
      }}
    >
      {/* ✅ Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <input
          type="search"
          placeholder="Search list"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #d0d5da",
            fontSize: 14,
          }}
        />

        {/* Avatar */}
        <Avatar initials="SK" />

        {/* Filter Button */}
        <button
          style={{
            border: "1px solid #d0d5da",
            background: "#fff",
            padding: "8px 14px",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Filter
        </button>
      </div>

      {/* ✅ Row Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        {/* Group Dropdown */}
        <select
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #d0d5da",
            fontSize: 14,
          }}
        >
          <option>Group</option>
        </select>

        {/* Settings Icons */}
        <div style={{ display: "flex", gap: 14, fontSize: 18, cursor: "pointer" }}>
          <span>⚙️</span>
          <span>⋮</span>
        </div>
      </div>

      {/* ✅ Table Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "50px 40px 120px 1fr 80px 120px 60px 60px 40px",
          fontWeight: 600,
          color: "#5f6368",
          borderBottom: "1px solid #dadce0",
          paddingBottom: 8,
          marginBottom: 6,
        }}
      >
        <div>
          <input type="checkbox" disabled />
        </div>
        <div>Type</div>
        <div>Key</div>
        <div>Summary</div>
        <div>Status</div>
        <div>Comments</div>
        <div>Assignee</div>
        <div>Due</div>
        <div>+</div>
      </div>

      {/* ✅ List Items */}
      {filtered.map((item) => (
        <div
          key={item.id}
          style={{
            display: "grid",
            gridTemplateColumns:
              "50px 40px 120px 1fr 80px 120px 60px 60px 40px",
            alignItems: "center",
            borderBottom: "1px solid #f1f3f4",
            padding: "10px 0",
          }}
        >
          <div>
            <input type="checkbox" checked={item.typeChecked} readOnly />
          </div>

          {/* Expand Icon (placeholder) */}
          <div style={{ fontWeight: 900, cursor: "pointer" }}>+</div>

          <div style={{ fontWeight: 600 }}>{item.key}</div>

          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.summary}
          </div>

          <StatusBadge text={item.status} />

          <div style={{ fontSize: 12, color: "#5f6368", cursor: "pointer" }}>
            Add comment
          </div>

          <Avatar initials={item.assigneeInitials} />

          <div></div>

          <div></div>
        </div>
      ))}

      {/* ✅ Create Row */}
      <div
        style={{
          marginTop: 14,
          color: "#1a73e8",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        + Create
      </div>
    </div>
  );
}
