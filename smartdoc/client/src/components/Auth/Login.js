import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.token) {
        // If name is missing, fallback to username from email
        const displayName = data.name || email.split("@")[0];

        localStorage.setItem("token", data.token);
        localStorage.setItem("name", displayName);

        // Show welcome alert (optional)
        alert(`Welcome, ${displayName}!`);

        onLogin(data.token);
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      alert("Error connecting to server");
    }
    setLoading(false);
  };

  return (
    <div className="auth-form">
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default Login;
