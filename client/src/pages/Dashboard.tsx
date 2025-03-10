import React, { useEffect, useState } from "react";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import axios from "axios";
import WorkoutForm from "@/components/WorkoutForm";
import { Link, Route, Routes, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const token = localStorage.getItem("token");

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

  const location = useLocation();
  const pathname = location.pathname;
  const condition = pathname === "/";

  const buttonClick = () => {
    console.log("You clicked the button!");
    console.log(location.pathname);
  };

  useEffect(() => {
    fetchUsername();
    fetchUserWorkouts();
  }, []);

  return (
    <>
      {condition ? (
        <>
          <div>
            <span>Welcome {username}!</span>
          </div>
          {/* <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"> */}
          <Link to="/workout-log">
            <button
              className="px-8 py-1 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600"
              onClick={buttonClick}
            >
              <Plus className="w-5 h-5" />
              Add workout
            </button>
          </Link>
          {workouts.map((workout, index) => (
            <div key={index}>
              <span>{workout.created} </span>
              <span>{workout.distance}km </span>
              <span>{workout.duration} minute(s)</span>
              <span>
                <SquarePen className="w-5 h-5" />
                <Trash2 className="w-5 h-5" />
              </span>
              <br></br>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
      <Routes>
        <Route path="/workout-log" element={<WorkoutForm token={token} />} />
      </Routes>
    </>
  );
};

export default Dashboard;
