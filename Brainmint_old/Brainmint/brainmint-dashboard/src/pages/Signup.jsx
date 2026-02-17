import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ onSignup }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok && data.message) {
      try {
        const loginRes = await fetch("http://127.0.0.1:8000/api/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        const loginData = await loginRes.json();

        if (loginRes.ok && loginData.user) {
          const rawUser = loginData.user;
          const userData = Array.isArray(rawUser)
            ? {
                id: rawUser[0],
                name: rawUser[1],
                email: form.email,
              }
            : {
                id: rawUser.id ?? rawUser.user_id ?? null,
                name: rawUser.full_name ?? rawUser.name ?? form.name,
                email: rawUser.email ?? form.email,
              };

          if (onSignup) {
            onSignup(userData);
          } else {
            localStorage.setItem("user", JSON.stringify(userData));
            navigate("/dashboard");
          }
        } else {
          alert("Signup successful, but login failed. Please log in manually.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Auto-login after signup failed:", error);
        alert("Signup successful, but something went wrong. Please log in.");
        navigate("/login");
      }
    } else {
      alert(data.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Join BrainMint and track your sprints smarter
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* Signup Button */}
        <button
          onClick={submit}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Login Button */}
        <button
          onClick={() => navigate("/login")}
          className="w-full border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
