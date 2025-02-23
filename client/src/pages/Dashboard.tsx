import React, { useState } from "react";
import WorkoutForm from "@/components/WorkoutForm.tsx";
import axios from "axios";

const Dashboard = ({ token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fetchProtectedData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/auth/get_name", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Protected data:", response.data);
    } catch (error) {
      console.error(
        "Failed to fetch protected data:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }
  };

  return (
    <>
      {/* <p>You are logged in!</p> */}
      {/* <span>Welcome!</span> */}
      <button
        onClick={fetchProtectedData}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Fetch Protected Data
      </button>
      {/* <WorkoutForm token={token} /> */}
    </>
  );
};

export default Dashboard;
