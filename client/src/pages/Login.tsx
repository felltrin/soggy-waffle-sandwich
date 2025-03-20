import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "@/components/FormInput";
import FormButton from "@/components/FormButton";

function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8080/auth/login", {
        userData,
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      // alert(response.data.message);
      navigate(0);
    } catch (error) {
      console.error(
        "Login failed:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-12 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-semibold mb-6 text-left">
          Login to your account
        </h2>
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <div className="mb-6">
            <label className="block mb-2 font-light">Username</label>
            <FormInput
              type="text"
              placeholder="Enter username"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label className="block mb-2 font-light">Password</label>
              <a className="text-right text-blue-500">Forgot?</a>
            </div>
            <FormInput
              type="password"
              placeholder="Enter password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>

          <FormButton buttonText={"Login now"} />
          <div className="flex items-center justify-center align-text-bottom pt-4">
            <p className="pr-4 text-gray-400">Don't have an account?</p>
            <a className="text-blue-500">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
