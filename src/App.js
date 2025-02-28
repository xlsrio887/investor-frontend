import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !privateKey) {
      setError("Заполните все поля!");
      return;
    }
    setError(""); 
    onLogin(email, privateKey);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h1 className="text-2xl mb-4">Вход в систему</h1>
        <input 
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-gray-700 text-white w-full mb-2 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Приватный ключ"
          className="p-2 rounded bg-gray-700 text-white w-full mb-2 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <button 
          onClick={handleLogin}
          disabled={!email || !privateKey}
          className={`p-2 w-full rounded mt-2 transition ${
            !email || !privateKey ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default Login;
