import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkoutForm from "@/components/WorkoutForm";
import { Route, Routes } from "react-router-dom";
import UpdateForm from "@/components/UpdateForm";
import WorkoutList from "@/components/WorkoutList";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [times, setTimes] = useState({});
  const [monthLabels, setMonthLabels] = useState([]);
  const [workoutToUpdateId, setWorkoutUpdateId] = useState(0);
  const token = localStorage.getItem("token");

  const fetchChartData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/api/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMonthLabels(response.data.workouts.month_label);
      setTimes(response.data.workouts.times);
    } catch (error) {
      console.error(
        "Failed to retrieve chart data:",
        error.response.data.msg || error.message
      );
    }
  };

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
      const response = await axios.get("http://127.0.0.1:8080/api/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkouts(response.data.workouts.data);
    } catch (error) {
      console.error(
        "Failed to retrieve workouts:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }
  };

  useEffect(() => {
    fetchUsername();
    fetchUserWorkouts();
    fetchChartData();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <WorkoutList
              username={username}
              workouts={workouts}
              monthLabels={monthLabels}
              setWorkouts={setWorkouts}
              setWorkoutUpdateId={setWorkoutUpdateId}
              times={times}
            />
          }
        />
        <Route
          path="/workout-log"
          element={
            <WorkoutForm
              token={token}
              setWorkouts={setWorkouts}
              setTimes={setTimes}
              setMonthLabels={setMonthLabels}
            />
          }
        />
        <Route
          path="/update-log"
          element={
            <UpdateForm
              token={token}
              workoutId={workoutToUpdateId}
              setWorkouts={setWorkouts}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Dashboard;
