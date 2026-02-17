import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok && data.user) {
      const rawUser = data.user;
      const userData = Array.isArray(rawUser)
        ? {
            id: rawUser[0],
            name: rawUser[1],
            email: form.email,
          }
        : {
            id: rawUser.id ?? rawUser.user_id ?? null,
            name: rawUser.full_name ?? rawUser.name ?? "",
            email: rawUser.email ?? form.email,
          };

      if (onLogin) {
        onLogin(userData);
      } else {
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard");
      }
    } else {
      alert(data.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Login to continue to BrainMint
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
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

        {/* Login Button */}
        <button
          onClick={submit}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Signup Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Create a new account
        </button>
      </div>
    </div>
  );
}
