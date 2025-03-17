import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateForm({ token, workoutId, setWorkouts }) {
  const [workout, setWorkout] = useState({
    duration: 0.0,
    distance: 0.0,
  });
  const nav = useNavigate();

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `http://127.0.0.1:8080/${workoutId}/update`;
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
      setWorkouts(response.data.workouts);
    } catch (error) {
      console.error(
        "Failed to update workout:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }

    nav("/");
  };

  const fetchWorkoutToUpdate = async () => {
    const url = `http://127.0.0.1:8080/${workoutId}/update`;
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
        <button onClick={() => nav("/")}>
          <ArrowLeft />
        </button>
        <form onSubmit={handleUpdateSubmit} className="max-w-md">
          <div className="mb-4">
            <label>Distance</label>
            <input
              type="number"
              step="0.01"
              placeholder="Distance"
              value={workout.distance}
              onChange={(e) => {
                setWorkout({ ...workout, distance: +e.target.value });
              }}
            />
            <label>km</label>
          </div>

          <div className="mb-4">
            <label>Duration</label>
            <input
              type="number"
              step="1"
              placeholder="Duration"
              value={workout.duration}
              onChange={(e) => {
                setWorkout({ ...workout, duration: +e.target.value });
              }}
            />
            <label>minutes</label>
          </div>

          <button
            type="submit"
            className="w-3/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
