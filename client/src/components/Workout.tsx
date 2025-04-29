import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Workout = ({ workout, index, setWorkoutUpdateId, onDelete }) => {
  return (
    <>
      <div
        key={index}
        className="flex justify-between items-center bg-white py-3 px-4 rounded-md mb-4"
      >
        <div className="mr-5">
          <span>{workout.created.substring(0, 16)} </span>
          <br></br>
          <span>{workout.distance}km </span>
          <span>{workout.duration} minute(s)</span>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <Link to="/update-log">
            <button
              onClick={() => setWorkoutUpdateId(workout.id)}
              className="cursor-pointer"
            >
              <div className="flex items-center bg-gray-200 dark:bg-gray-700 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600">
                <Pencil className="w-5 h-5" />
              </div>
            </button>
          </Link>
          <button
            onClick={() => onDelete(workout.id)}
            className="cursor-pointer"
          >
            <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600">
              <Trash2 className="w-5 h-5" />
            </div>
          </button>
        </div>
        {/* <br></br> */}
      </div>
    </>
  );
};

export default Workout;
