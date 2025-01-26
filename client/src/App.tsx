import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import "./App.css";
import axios from "axios";
import Login from './Login';
import Register from "./pages/Register";
import Home from "./pages/Home";

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

  const fetchProtectedData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/auth/get_name", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Protected data:', response.data);
    } catch (error) {
      console.error('Failed to fetch protected data:', error.response?.data?.msg || error.message);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      {!token ? (
        <>
          <Router>
            <nav>
              <Link to="/">Home</Link> | <Link to="/register">Register</Link>
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
          <Login setToken={setToken} />
        </>
      ) : (
        <>
          <p>You are logged in!</p>
          <button onClick={fetchProtectedData}>Fetch Protected Data</button>
        </>
      )}
    </>
  );
}

export default App;
