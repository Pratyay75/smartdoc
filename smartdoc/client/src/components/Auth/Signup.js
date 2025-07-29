import React, { useState } from "react";

function Signup({ onToggle }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (data.message) {
        alert("Signup successful! Please login.");
        onToggle(); // Switch to login form
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      alert("Error connecting to server");
    }
    setLoading(false);
  };

  return (
    <div className="auth-form">
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signup} disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
    </div>
  );
}

export default Signup;
