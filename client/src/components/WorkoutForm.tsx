import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { ArrowLeft } from "lucide-react";
import FormButton from "./FormButton";

function WorkoutForm({ token, setWorkouts }) {
  const [formData, setFormData] = useState({
    distance: "",
    duration: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/create",
        {
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data recieved:", response.data);
      setWorkouts(response.data.workouts.data);
    } catch (error) {
      console.error(
        "Failed to fetch protected data:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
        >
          <ArrowLeft />
        </button>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label>Distance</label>
            <FormInput
              type="number"
              placeholder="Enter distance"
              value={formData.distance}
              onChange={(e) => {
                setFormData({ ...formData, distance: +e.target.value });
              }}
            />
            <label>km</label>
          </div>

          <div className="mb-4">
            <label>Duration</label>
            <FormInput
              type="number"
              placeholder="Enter duration"
              value={formData.duration}
              onChange={(e) => {
                setFormData({ ...formData, duration: +e.target.value });
              }}
            />
            <label>minutes</label>
          </div>

          <FormButton buttonText={"Add Workout"} />
        </form>
      </div>
    </div>
  );
}

export default WorkoutForm;
