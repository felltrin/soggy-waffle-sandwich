import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:8080/api/users");
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <h1 className="text-5xl font-bold underline">
        Hello World!
      </h1>
      {
        array.map((user, index) => (
          <div key={index}>
            <span>{user}</span>
            <br/>
          </div>
        ))
      }
    </>
  )
}

export default App
