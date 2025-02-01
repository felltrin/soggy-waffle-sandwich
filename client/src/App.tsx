import {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import "./App.css";
import axios from "axios";
import Login from './pages/Login';
import Register from "./pages/Register";

function App() {
  const [token, setToken] = useState(null);

  const fetchProtectedData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/auth/get_name", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Protected data:', response.data);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      console.error('Failed to fetch protected data:', error.response?.data?.msg || error.message);
    }
  };

  return (
    <>
      {!token ? (
        <>
          <Router>
            <nav>
              <Link to="/">Home</Link> | <Link to="/register">Register</Link>
            </nav>
            <Routes>
              <Route path="/" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register setToken={setToken} />} />
            </Routes>
          </Router>
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
