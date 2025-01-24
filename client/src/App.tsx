import {useState, useEffect} from "react";
import "./App.css";
import axios from "axios";
import Login from './Login';

function App() {
  const [array, setArray] = useState([]);
  const [token, setToken] = useState(null);

  const fetchAPI = async () => {
    axios.get("http://127.0.0.1:8080/api/users")
      .then(response => {
        setArray(response.data.users);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  return (
    <>
      {/*<h1 className="text-5xl font-bold underline p-4">Hello World!</h1>*/}
      <Login setToken={setToken} />
    </>
  );
}

export default App;
