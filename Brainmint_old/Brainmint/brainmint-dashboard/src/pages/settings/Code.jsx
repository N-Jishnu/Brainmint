import React from "react";

const integrationButtons = [
  { label: "Connect GitHub", icon: "🐙" },
  { label: "Connect GitLab", icon: "🦊" },
  { label: "Connect Bitbucket", icon: "🧰" }
];

const Code = () => {
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

        {/* --- CODE SECTION --- */}
        <section style={{ marginTop: 48, textAlign: "center" }}>

          {/* Sticky note + code box */}
          <div
            style={{
              marginBottom: 32,
              display: "flex",
              justifyContent: "center",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            {/* Purple sticky card */}
            <div
              style={{
                width: 200,
                height: 120,
                background:
                  "linear-gradient(135deg, #7c73f9 0%, #a19dfc 100%)",
                borderRadius: 10,
                boxShadow: "0 4px 12px rgb(124 115 249 / 0.4)",
                padding: 16,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 8,
                  backgroundColor: "#6deb7d",
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 16,
                  width: 24,
                  height: 24,
                  backgroundColor: "rgba(255,255,255,0.5)",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  fontSize: 24,
                  color: "white",
                  marginTop: "auto",
                  fontWeight: "600",
                }}
              >
                kan-251
              </div>
            </div>

            {/* Black terminal */}
            <pre
              style={{
                backgroundColor: "#0f0f0f",
                borderRadius: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                color: "#7ae582",
                fontFamily: "monospace",
                fontSize: 16,
                padding: "16px 24px",
                whiteSpace: "pre-wrap",
                minWidth: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              $ git commit -m "Kan-1 update"
            </pre>
          </div>

          {/* Heading */}
          <h2 style={{ fontWeight: "700", fontSize: 22, marginBottom: 12 }}>
            Connect your code to BrainMint
          </h2>

          {/* Description */}
          <p
            style={{
              marginBottom: 32,
              maxWidth: 440,
              color: "#5f6368",
              fontSize: 15,
              lineHeight: 1.5,
              margin: "0 auto",
            }}
          >
            Minimize context switching and gain visibility of your team's pull
            requests and development workflow.
          </p>

          {/* Integration buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {integrationButtons.map(({ label, icon }) => (
              <button
                key={label}
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 6,
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "white",
                  color: "#3c4043",
                }}
              >
                <span style={{ fontSize: 18 }}>{icon}</span> {label}
              </button>
            ))}
          </div>

          {/* Link */}
          <div style={{ marginTop: 24 }}>
            <a
              href="#"
              style={{
                color: "#1a73e8",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Explore other integrations
            </a>
          </div>

        </section>
      </main>
    </div>
  );
};

export default Code;
