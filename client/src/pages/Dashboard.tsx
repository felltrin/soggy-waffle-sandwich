import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
// import WorkoutForm from "@/components/WorkoutForm.tsx";
import axios from "axios";

const Dashboard = ({ token }) => {
  const [username, setUsername] = useState("");
  const [workouts, setWorkouts] = useState([]);

  const fetchUsername = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/auth/get_name", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error(
        "Failed to fetch username:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }
  };

  const fetchUserWorkouts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkouts(response.data.workouts);
    } catch (error) {
      console.error(
        "Failed to retrieve workouts:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }
  };

  const buttonClick = () => {
    console.log("You clicked the button!");
  };

  useEffect(() => {
    fetchUsername();
    fetchUserWorkouts();
  }, []);

  return (
    <>
      <div>
        <span>Welcome {username}!</span>
      </div>
      {/* <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"> */}
      <button
        className="px-8 py-1 bg-blue-500 text-white rounded-md flex items-center gap-2"
        onClick={buttonClick}
      >
        <Plus className="w-5 h-5" />
        Add workout
      </button>
      {workouts.map((workout, index) => (
        <div key={index}>
          <span>{workout.created} </span>
          <span>{workout.distance}km </span>
          <span>{workout.duration} minute(s)</span>
          <br></br>
        </div>
      ))}
      {/* <WorkoutForm token={token} /> */}
    </>
  );
};

export default Dashboard;
