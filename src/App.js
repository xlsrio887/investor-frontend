import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get("https://investor-api.onrender.com/")
        .then(response => setData(response.data))
        .catch(() => setData("Ошибка загрузки данных"));
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (email && privateKey) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {!isLoggedIn ? (
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
            onClick={handleLogin}
            className="p-2 bg-blue-500 w-full rounded mt-2"
          >
            Войти
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h1 className="text-2xl mb-4">Dashboard</h1>
          <p><strong>Баланс:</strong> {data ? data.balance : "Загрузка..."}</p>
          <p><strong>TVL:</strong> {data ? data.tvl : "Загрузка..."}</p>
          <p><strong>Доходность:</strong> {data ? data.yield : "Загрузка..."}</p>
        </div>
      )}
    </div>
  );
}

export default App;
