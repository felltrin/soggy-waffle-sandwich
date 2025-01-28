import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validatePassword = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // validate username
    if (!formData.username) {
      setErrors((prev) => ({...prev, username: "Username is required"}));
      return;
    }

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrors((prev) => ({...prev, email: "Invalid email address"}));
      return;
    }

    // validate password
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setErrors((prev) => ({...prev, password: passwordErrors.join(". ")}));
      return;
    }

    // confirm password match
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      // FIXME: this doesn't work when the response is OK
      if (response.ok) {
        // Redirect to login or dashboard
        // router.push("/login");
      } else {
        // Handle signup errors
        setErrors((prev) => ({
          ...prev,
          username: data.message || "Signup failed",
        }));
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input type="text" id="username" placeholder="Username" className="w-full px-3 py-2 border rounded"
                   onChange={(e) => setFormData({...formData, username: e.target.value})
                   }/>
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