import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WorkoutForm({ token }) {
  const [formData, setFormData] = useState({
    distance: 0.0,
    duration: 0.0,
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
    } catch (error) {
      console.error(
        "Failed to fetch protected data:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }

    navigate("/");
    navigate(0);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label>Distance</label>
            <input
              type="number"
              step="0.01"
              placeholder="Distance"
              value={formData.distance}
              onChange={(e) => {
                setFormData({ ...formData, distance: +e.target.value });
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
              value={formData.duration}
              onChange={(e) => {
                setFormData({ ...formData, duration: +e.target.value });
              }}
            />
            <label>minutes</label>
          </div>

          {/* <Link to="*"> */}
          <button
            type="submit"
            className="w-3/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
}

export default WorkoutForm;
