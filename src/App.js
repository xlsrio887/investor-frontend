import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, privateKey) => {
    axios.post("https://investor-api.onrender.com/login", { email, privateKey })
      .then(response => {
        setUser(response.data);
        setIsLoggedIn(true);
      })
      .catch(() => alert("Ошибка входа!"));
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-2xl mb-4">Вход в систему</h1>
        <input 
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-gray-700 text-white w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Приватный ключ"
          className="p-2 rounded bg-gray-700 text-white w-full mb-2"
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        <button 
          onClick={() => onLogin(email, privateKey)}
          className="p-2 bg-blue-500 w-full rounded mt-2"
        >
          Войти
        </button>
      </div>
    </div>
  );
}

function Dashboard({ user }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-2xl mb-4">Dashboard</h1>
        <p><strong>Баланс:</strong> {user.balance} SOL</p>
        <p><strong>TVL:</strong> {user.tvl} USDC</p>
        <p><strong>Доходность:</strong> {user.yield}%</p>
      </div>
    </div>
  );
}

export default App;
