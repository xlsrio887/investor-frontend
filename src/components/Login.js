import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleLogin = async () => {
    const response = await fetch("https://investor-api.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, privateKey })
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
      <h2>Вход</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Приватный ключ" value={privateKey} onChange={e => setPrivateKey(e.target.value)} />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default Login;
