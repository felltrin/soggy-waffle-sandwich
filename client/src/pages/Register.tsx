import React, {useState} from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8080/auth/register", {
        formData
      });

      alert(response.data.message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      console.error("Registration failed:", error.response?.data?.msg || error.message);
      alert('Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block mb-2">
              Username
            </label>
            <input type="text"
                   placeholder="Username"
                   value={formData.username}
                   onChange={(e) => setFormData({...formData, username: e.target.value})}
                   className="w-full px-3 py-2 border rounded"/>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input type="password"
                   placeholder="Password"
                   value={formData.password}
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                   className="w-full px-3 py-2 border rounded"/>
          </div>

          <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;