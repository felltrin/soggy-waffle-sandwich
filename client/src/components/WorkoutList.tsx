import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Workout from "./Workout";
import EmptyCard from "./EmptyCard";
import addWorkoutImg from "../assets/images/new-element-addition.png";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

function WorkoutList({
  username,
  workouts,
  monthLabels,
  setWorkouts,
  setWorkoutUpdateId,
  times,
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const new_obj = {};
  for (let i = 0; i < monthLabels.length; i++) {
    if (!new_obj[monthLabels[i]]) {
      new_obj[monthLabels[i]] = times[monthLabels[i]];
    }
  }

  const labels = Object.keys(new_obj);
  const theData = Object.values(new_obj);

  const data = {
    labels,
    datasets: [
      {
        label: `${username}'s Times`,
        data: theData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${username}'s Average Run Times`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Time (in mins)",
        },
      },
    },
  };

  const signOutButton = async () => {
    try {
      const response = await axios.delete("http://127.0.0.1:8080/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Failed to sign out user:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }
    localStorage.clear();
    // TODO: fix this
    navigate(0);
    console.log("The local storage has been cleared");
  };

  const onDelete = async (workoutId: number) => {
    const url = `http://127.0.0.1:8080/${workoutId}/delete`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios({
        method: "post",
        url: url,
        headers: headers,
      });
      setWorkouts(response.data.workouts.data);
    } catch (error) {
      console.error(
        "Failed to delete workout log:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 min-h-screen">
        <div></div>
        <div className="p-4">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Welcome {username}!
            </h2>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xl">
              <div className="flex items-start justify-between mb-2">
                <button
                  className="px-4 py-2 mb-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600 cursor-pointer"
                  onClick={() => navigate("/workout-log")}
                >
                  <Plus className="w-5 h-5" />
                  Add Workout
                </button>

                <button
                  className="bg-red-500 text-white flex items-center gap-2 px-8 py-1 rounded-md hover:bg-red-600 cursor-pointer justify-around"
                  onClick={signOutButton}
                >
                  Sign out
                </button>
              </div>

              <div className="container mt-auto">
                {workouts.length > 0 ? (
                  <>
                    <div className="bg-gray-100 p-4 rounded-xl">
                      {workouts.map((workout, index) => (
                        <Workout
                          workout={workout}
                          index={index}
                          setWorkoutUpdateId={setWorkoutUpdateId}
                          onDelete={onDelete}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <EmptyCard
                    imgSrc={addWorkoutImg}
                    message={"No workouts yet. Please add a workout"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 mt-18">
          {workouts.length > 0 ? (
            <div className="bg-gray-100 mt-3 rounded-2xl p-4">
              <button className="bg-white rounded-md p-1">
                <X className="justify-end" />
              </button>
              <Line options={options} data={data} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default WorkoutList;
