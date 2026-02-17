import React, { useState } from "react";

export default function Forms() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    priority: "Medium",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: 24,
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: "600", color: "#202124" }}>
          Create New Task
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="search"
            placeholder="Search form fields"
            style={{
              padding: "8px 12px",
              borderRadius: 20,
              border: "1px solid #dadce0",
              outline: "none",
              fontSize: 14,
            }}
          />
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#4285f4",
              color: "white",
              fontWeight: "bold",
              fontSize: 14,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            SK
          </div>
        </div>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: 24,
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          maxWidth: 700,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #dadce0",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #dadce0",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Project Title
          </label>
          <input
            type="text"
            name="project"
            value={formData.project}
            onChange={handleChange}
            placeholder="Enter project name"
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #dadce0",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #dadce0",
              outline: "none",
            }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the task..."
            rows="4"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #dadce0",
              outline: "none",
              resize: "none",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#1a73e8",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
            alignSelf: "flex-end",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#155ab6")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1a73e8")}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
