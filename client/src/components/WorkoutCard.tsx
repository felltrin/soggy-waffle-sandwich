import { SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const WorkoutCard = ({ workout, index, setWorkoutUpdateId, onDelete }) => {
  return (
    <>
      <div key={index} className="px-2">
        <span>{workout.created.substring(0, 16)} </span>
        <span>{workout.distance}km </span>
        <span>{workout.duration} minute(s)</span>
        <Link to="/update-log">
          <button>
            <SquarePen
              className="w-5 h-5 mx-2"
              onClick={() => setWorkoutUpdateId(workout.id)}
            />
          </button>
        </Link>
        <button>
          <Trash2
            className="w-5 h-5 mx-2"
            onClick={() => onDelete(workout.id)}
          />
        </button>
        <br></br>
      </div>
    </>
  );
};

export default WorkoutCard;
