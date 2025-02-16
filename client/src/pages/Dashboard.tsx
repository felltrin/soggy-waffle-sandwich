import React from "react";
import WorkoutForm from "@/components/WorkoutForm.tsx";
import axios from "axios";

const Dashboard = ({ token }) => {
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
      <p>You are logged in!</p>
      <button onClick={fetchProtectedData}>Fetch Protected Data</button>
      <WorkoutForm/>
    </>
  );
};



export default Dashboard;