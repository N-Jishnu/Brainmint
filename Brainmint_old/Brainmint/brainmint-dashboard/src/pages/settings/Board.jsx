import React, { useState } from "react";

const sampleTasks = [
  {
    id: 1,
    title: "Security & permissions: How to control who can edit or manage projects",
    key: "LEARNJIRA-1",
    duration: "1:18",
    color: "#e5ecff",
  },
  {
    id: 2,
    title: "Plans: How to use detailed roadmaps to plan out your w...",
    key: "LEARNJIRA-2",
    duration: "1:11",
    color: "#e8f6e5",
  },
];

const TaskCard = ({ title, duration, color, taskKey }) => (
  <div
    style={{
      backgroundColor: color,
      borderRadius: 8,
      padding: "12px 14px",
      marginBottom: 14,
      boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
      position: "relative",
      cursor: "pointer",
      transition: "0.2s",
    }}
  >
    <div
      style={{
        fontSize: 11,
        color: "#555",
        marginBottom: 6,
        fontWeight: 600,
      }}
    >
      {taskKey}
    </div>

    <div
      style={{
        fontSize: 14,
        color: "#1f1f1f",
        lineHeight: 1.4,
        fontWeight: 500,
      }}
    >
      {title}
    </div>

    <div
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#00000080",
        color: "white",
        fontSize: 11,
        padding: "2px 7px",
        borderRadius: 10,
      }}
    >
      {duration}
    </div>
  </div>
);

const KanbanBoard = () => {
  const [search, setSearch] = useState("");

  const filteredTasks = sampleTasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        fontFamily: "Segoe UI, Arial",
        fontSize: 14,
        padding: 20,
        height: "100vh",
        backgroundColor: "#f7f8fa",
        boxSizing: "border-box",
      }}
    >
      {/* ✅ Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <input
          type="search"
          placeholder="Search board"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 14px",
            borderRadius: 18,
            border: "1px solid #d0d5dd",
            fontSize: 14,
          }}
        />

        {/* Avatar */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            backgroundColor: "#3b82f6",
            color: "white",
            fontWeight: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 14,
          }}
        >
          SK
        </div>

        <button
          style={{
            background: "#fff",
            border: "1px solid #d0d5dd",
            padding: "6px 16px",
            borderRadius: 18,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Filter
        </button>
      </div>

      {/* ✅ Board Columns */}
      <div
        style={{
          display: "flex",
          gap: 16,
          height: "calc(100% - 64px)",
          overflowX: "auto",
        }}
      >
        {/* ================= TO DO COLUMN ================= */}
        <div
          style={{
            flex: "0 0 300px",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 12,
              fontSize: 14,
              color: "#1f1f1f",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            TO DO <span>{filteredTasks.length}</span>
          </div>

          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                taskKey={task.key}
                duration={task.duration}
                color={task.color}
              />
            ))}
          </div>
        </div>

        {/* ================= IN PROGRESS ================= */}
        <div
          style={{
            flex: "0 0 300px",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 12,
              fontSize: 14,
              color: "#1f1f1f",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            IN PROGRESS <span>0</span>
          </div>

          <button
            style={{
              border: "none",
              background: "transparent",
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              textAlign: "left",
              paddingLeft: 2,
            }}
          >
            + Create issue
          </button>
        </div>

        {/* ================= DONE COLUMN ================= */}
        <div
          style={{
            flex: "0 0 300px",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 12,
              fontSize: 14,
              color: "#1f1f1f",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            DONE <span>0</span>
          </div>

          <button
            style={{
              border: "none",
              background: "transparent",
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              textAlign: "left",
              paddingLeft: 2,
            }}
          >
            + Create issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
