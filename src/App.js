import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("https://investor-api.onrender.com/")
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        setMessage("Ошибка подключения к API");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Investor Dashboard</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
