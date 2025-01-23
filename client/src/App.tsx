import {useState, useEffect} from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    axios.get("http://127.0.0.1:8080/api/users")
      .then(response => {
        setArray(response.data.users);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <h1 className="text-5xl font-bold underline p-4">Hello World!</h1>
      {array ? (
        <>
          {array.map((user, index) => (
            <div key={index}>
              <span>{user}</span>
              <br/>
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
