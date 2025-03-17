import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function UpdateForm() {
  const nav = useNavigate();

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("you pressed the submit button");
  };

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
              // value={12}
              // onChange={(e) => {
              //   setFormData({ ...formData, distance: +e.target.value });
              // }}
            />
            <label>km</label>
          </div>

          <div className="mb-4">
            <label>Duration</label>
            <input
              type="number"
              step="1"
              placeholder="Duration"
              // value={12}
              // onChange={(e) => {
              //   setFormData({ ...formData, duration: +e.target.value });
              // }}
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
