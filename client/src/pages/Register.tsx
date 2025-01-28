// import React from "react";

function Register() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form className="max-w-md mx-auto">
            <div className="mb-4">
              <label className="block mb-2">Username</label>
              <input type="text" id="username" placeholder="Username" className="w-full px-3 py-2 border rounded"/>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded"/>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input type="password" id="password" placeholder="Password" className="w-full px-3 py-2 border rounded"/>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm Password"
                     className="w-full px-3 py-2 border rounded"/>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Register
            </button>
          </form>
        </div>
      </div>
  );
}

export default Register;