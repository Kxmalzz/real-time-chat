import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthTab = () => {
  const [tab, setTab] = useState('login');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔐 Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await res.json();
      if (res.status === 201) {
        alert("Registration successful! Please login.");
        setTab("login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Error during registration");
    }
  };

  // 🔐 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("username", data.username);
        alert("Login successful!");
        navigate("/app");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login error");
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/image/m1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          backdropFilter:"blur(10px)",
  animation:"fadeIn 0.4s ease-in-out",
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(240, 229, 229, 0.9)',
          padding: '2rem',
          borderRadius: '10px',
          width: '300px',
          color:'#1c2833',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <button
            onClick={() => setTab('login')}
            style={{
              marginRight: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: tab === 'login' ? '#8690ce' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
          <button
            onClick={() => setTab('register')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: tab === 'register' ? '#8690ce' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0' }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0' }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#a569bd',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h2 style={{ textAlign: 'center' }}>Register</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0' }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthTab;