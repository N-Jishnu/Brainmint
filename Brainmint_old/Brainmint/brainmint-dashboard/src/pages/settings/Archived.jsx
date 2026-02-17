import React from "react";

const Archived = () => {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: 14,
        color: "#202124",
        backgroundColor: "#fff",
        minHeight: "100vh",
      }}
    >
      <main style={{ maxWidth: 900, margin: "24px auto", padding: "0 16px" }}>

        {/* Page Title */}
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: "600",
            fontSize: 24,
          }}
        >

        </h1>

        {/* Empty state section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "260px",
            marginTop: 40,
            color: "#5f6368",
            textAlign: "center",
            userSelect: "none",
            padding: "16px",
          }}
        >
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
            stroke="#5f6368"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: 14 }}
            viewBox="0 0 24 24"
          >
            <path d="M3 9v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9" />
            <polyline points="3 9 12 15 21 9" />
            <rect x="9" y="3" width="6" height="6" rx="2" ry="2" />
          </svg>

          {/* Heading */}
          <div style={{ fontWeight: "600", fontSize: 16, marginBottom: 6 }}>
            No archived work items
          </div>

          {/* Description */}
          <div style={{ maxWidth: 320, lineHeight: 1.5 }}>
            Archived work items will appear here.  
            Archive items to keep your project organized while still retaining access to older data.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Archived;
