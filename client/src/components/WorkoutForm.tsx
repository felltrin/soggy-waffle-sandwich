import React, {useState} from "react";
import axios from 'axios';

function WorkoutForm() {
  const [formData, setFormData] = useState({
    distance: 0.0,
    duration: 0.0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hello world!");
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label>Distance</label>
            <input type="number"
                   step="0.01"
                   placeholder="Distance"
                   value={formData.distance}
                   onChange={(e) => {
                     setFormData({...formData, distance: e.target.value});
                   }}/>
            <label>km</label>
          </div>

          <div className="mb-4">
            <label>Duration</label>
            <input type="number" step="1" placeholder="Duration"
                   value={formData.duration} onChange={(e) => {
                     setFormData({...formData, duration: e.target.value});
                   }}/>
            <label>minutes</label>
          </div>

          <button type="submit" className="w-3/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default WorkoutForm;