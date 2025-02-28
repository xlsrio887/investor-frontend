import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleLogin = () => {
    if (email && privateKey) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-white text-xl mb-4">Вход в систему</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 mb-2 bg-gray-700 text-white rounded"
        />
        <input
          type="password"
          placeholder="Приватный ключ"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          className="block w-full p-2 mb-4 bg-gray-700 text-white rounded"
        />
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 rounded">
          Войти
        </button>
      </div>
    </div>
  );
};

export default Login;
