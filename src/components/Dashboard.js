import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://investor-api.onrender.com/user-data")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Ошибка при загрузке данных:", err));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Личный кабинет</h2>
        {data ? (
          <div>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Баланс:</strong> {data.balance} USDC</p>
            <p><strong>TVL:</strong> {data.tvl} SOL</p>
            <p><strong>Доходность:</strong> {data.yield}%</p>
            <p><strong>Активные пулы:</strong></p>
            <ul>
              {data.pools.map((pool, index) => (
                <li key={index}>
                  <strong>Пул:</strong> {pool.name} <br />
                  <strong>Хеш:</strong> {pool.hash} <br />
                  <strong>Сумма:</strong> {pool.amount} SOL
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Загрузка данных...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
