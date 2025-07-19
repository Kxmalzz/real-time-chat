import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
function Login() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const handleLogin = async (e) => {
e.preventDefault(); // Don't forget this on form submit
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
alert("login successful!");
navigate("/app"); // Go to chat page
} else {
alert(data.message || "Login failed");
  }
} catch (err) {
  console.error("Login error:", err);
  alert("Login error");
}
};
return (
<div>
  <h2>Login</h2>
  <form onSubmit={handleLogin}>
       
    <input
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      required
    /><br />
    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      required
    /><br />
    <button type="submit">Login</button>
  </form>
  <p>Don't have an account? <Link to="/register">Register here</Link></p>
</div>
);
}
export default Login;