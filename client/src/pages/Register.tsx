import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "@/components/FormInput";
import FormButton from "@/components/FormButton";

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
  const navigate = useNavigate();

  /**
   * Puts the user input through a security check like the TSA
   * at an airport to contribute to make feedback clear to the
   * user
   *
   * @param {string} password The password the user has inputted
   * @return {string[]} The array of errors the user has actuated
   */
  const validatePassword = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be 8 letters long");
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

  /**
   * Registration logic when the user presses the register button.
   * Sends the request to the server
   *
   * @param e event param
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // validate username
    if (!formData.username) {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
      return;
    }

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      return;
    }

    // validate password
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      const string = passwordErrors.join(". ");
      setErrors((prev) => ({ ...prev, password: string }));
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
      const response = await axios.post("http://127.0.0.1:8080/auth/register", {
        formData,
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      alert(response.data.message);
      navigate("/");
      // TODO: fix this
      navigate(0);
    } catch (error) {
      console.error(
        "Registration failed:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-12 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-semibold mb-6 text-left">
          Create an account
        </h2>
        <form onSubmit={handleRegister} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <FormInput
              type="text"
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <FormInput
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <FormInput
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Confirm password</label>
            <FormInput
              type="password"
              placeholder="Enter password again"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <FormButton buttonText={"Create account"} />
          <div className="flex items-center justify-center align-text-bottom pt-4">
            <p className="pr-4 text-gray-400">Already have an account?</p>
            <a className="text-blue-500">Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
