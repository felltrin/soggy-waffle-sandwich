import React, {useState} from 'react';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function Login({setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8080/auth/login", {
        username,
        password
      });

      const {access_token} = response.data;
      setToken(access_token);
      alert(response.data.message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      console.error("Login failed:", error.response?.data?.msg || error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block mb-2">
              Email
            </label>
            <input type="text"
                   placeholder="Username"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   className="w-full px-3 py-2 border rounded"/>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input type="password"
                   placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full px-3 py-2 border rounded"/>
          </div>

          <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;