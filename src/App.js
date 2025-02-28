import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("https://investor-api.onrender.com/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUser(response.data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const handleAuth = (endpoint, email, privateKey) => {
    axios.post(`https://investor-api.onrender.com/${endpoint}`, { email, privateKey })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
      })
      .catch(() => alert("Ошибка авторизации"));
  };

  return (
    <div>
      {!user ? (
        <Auth onAuth={handleAuth} />
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}

function Auth({ onAuth }) {
  const [email, setEmail] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h1 className="text-2xl mb-4">Вход / Регистрация</h1>
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
        <div className="flex gap-2">
          <button 
            onClick={() => onAuth("login", email, privateKey)}
            className="p-2 bg-blue-500 w-1/2 rounded mt-2"
          >
            Войти
          </button>
          <button 
            onClick={() => onAuth("register", email, privateKey)}
            className="p-2 bg-green-500 w-1/2 rounded mt-2"
          >
            Регистрация
          </button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ user }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h1 className="text-2xl mb-4">Личный кабинет</h1>
        <p><strong>Баланс:</strong> {user.balance} SOL</p>
        <p><strong>TVL:</strong> {user.tvl} USDC</p>
        <p><strong>Доходность:</strong> {user.yield}%</p>
        <h2 className="text-xl mt-4">Активные пулы:</h2>
        <ul>
          {user.pools.map((pool, index) => (
            <li key={index} className="p-2 bg-gray-700 mt-1 rounded">{pool}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
