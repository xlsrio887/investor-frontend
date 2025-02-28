import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    const response = await fetch("https://investor-api.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, privateKey, username })
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
      <h2>Регистрация</h2>
      <input type="text" placeholder="Имя пользователя" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Приватный ключ" value={privateKey} onChange={e => setPrivateKey(e.target.value)} />
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
};

export default Register;
