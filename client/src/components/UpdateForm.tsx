import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import FormButton from "./FormButton";

function UpdateForm({ token, workoutId, setWorkouts }) {
  const [workout, setWorkout] = useState({
    duration: "",
    distance: "",
  });
  const nav = useNavigate();

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `http://127.0.0.1:8080/api/${workoutId}/update`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios({
        method: "post",
        url: url,
        headers: headers,
        data: {
          workout,
        },
      });
      setWorkouts(response.data.workouts.data);
    } catch (error) {
      console.error(
        "Failed to update workout:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }

    setWorkout({
      duration: "",
      distance: "",
    });
    nav("/");
  };

  const fetchWorkoutToUpdate = async () => {
    const url = `http://127.0.0.1:8080/api/${workoutId}/update`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios({
        method: "get",
        url: url,
        headers: headers,
      });
      setWorkout({
        ...workout,
        duration: response.data.duration,
        distance: response.data.distance,
      });
    } catch (error) {
      console.error(
        "Failed to retrieve workout:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }
  };

  useEffect(() => {
    fetchWorkoutToUpdate();
  }, []);

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <button
          onClick={() => nav("/")}
          className="bg-gray-200 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
        >
          <ArrowLeft />
        </button>
        <form onSubmit={handleUpdateSubmit} className="max-w-md">
          <div className="mb-4">
            <label>Distance</label>
            <FormInput
              type="number"
              placeholder="Enter distance"
              value={workout.distance}
              onChange={(e) => {
                setWorkout({ ...workout, distance: +e.target.value });
              }}
            />
            <label>km</label>
          </div>

          <div className="mb-4">
            <label>Duration</label>
            <FormInput
              type="number"
              placeholder="Enter duration"
              value={workout.duration}
              onChange={(e) => {
                setWorkout({ ...workout, duration: +e.target.value });
              }}
            />
            <label>minutes</label>
          </div>

          <FormButton buttonText={"Submit"} />
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
