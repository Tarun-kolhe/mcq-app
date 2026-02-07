import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    // temporary hardcoded credentials
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  }
   function handleNavigateHome(){
    navigate("/")
   }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h2 className="login-title">Admin Login</h2>
          <p className="login-subtitle">Enter your credentials to continue</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-input-group">
            <label className="login-label">Username</label>
            <input
              type="text"
              className="login-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <label className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}
          <div className="btn_cont">
            <button type="submit" className="login-button">
            Login
          </button>

           <button className="login-button" onClick={handleNavigateHome}>
           🏠 Home
          </button>
          </div>
          
        </form>

        <div className="login-footer">
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;