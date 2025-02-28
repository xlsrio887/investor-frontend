import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login"; // Если нет токена, кидаем на логин
        return;
      }

      try {
        const response = await fetch("https://investor-api.onrender.com/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Ошибка запроса");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="container">
      <h1>Добро пожаловать, {userData.username}</h1>
      <p>Email: {userData.email}</p>
      <p>TVL: ${userData.tvl}</p>
      <p>Баланс: ${userData.balance}</p>
      <p>Доходность: {userData.yield}%</p>
      <p>Курс SOL: ${userData.solPrice}</p>

      <h2>Активные пулы</h2>
      <ul>
        {userData.pools.map(pool => (
          <li key={pool.hash}>
            <strong>{pool.name}</strong>  
            <p>Хеш пула: {pool.hash}</p>
            <p>Сумма: ${pool.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
