import React, { useState } from "react";
// import WorkoutForm from "@/components/WorkoutForm.tsx";
import axios from "axios";

const Dashboard = ({ token }) => {
  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/auth/get_name", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error(
        "Failed to fetch protected data:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }
  };

  fetchUserData();

  return (
    <>
      <div>
        <span>Welcome {username}!</span>
      </div>
      <button className="w-32 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add workout
      </button>
      {/* <button onClick={fetchProtectedData}>Fetch protected data</button> */}
      {/* <WorkoutForm token={token} /> */}
    </>
  );
};

export default Dashboard;
