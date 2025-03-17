import React, { useEffect, useState } from "react";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import axios from "axios";
import WorkoutForm from "@/components/WorkoutForm";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import UpdateForm from "@/components/UpdateForm";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
      const response = await axios.get("http://127.0.0.1:8080/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkouts(response.data.workouts);
    } catch (error) {
      console.error(
        "Failed to retrieve workouts:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }
  };

  const location = useLocation();
  const pathname = location.pathname;
  const condition = pathname === "/";

  const editButtonClick = () => {
    console.log("You clicked the edit button!");
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
      setWorkouts(response.data.workouts);
    } catch (error) {
      console.error(
        "Failed to delete workout log:",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response?.data?.msg || error.message
      );
    }
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

  useEffect(() => {
    fetchUsername();
    fetchUserWorkouts();
  }, []);

  return (
    <>
      {condition ? (
        <>
          <div>
            <span>Welcome {username}!</span>
          </div>
          <Link to="/workout-log">
            <button className="px-8 py-1 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
              <Plus className="w-5 h-5" />
              Add workout
            </button>
          </Link>
          {workouts.map((workout, index) => (
            <div key={index} className="px-2">
              <span>{workout.created} </span>
              <span>{workout.distance}km </span>
              <span>{workout.duration} minute(s)</span>
              <Link to="/update-log">
                <button>
                  <SquarePen
                    className="w-5 h-5 mx-2"
                    onClick={editButtonClick}
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
          ))}
          <div className="py-4 px-2">
            <button
              className="bg-red-500 text-white flex items-center gap-2 px-8 py-1 rounded-md hover:bg-red-600"
              onClick={signOutButton}
            >
              Sign out
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      <Routes>
        <Route
          path="/workout-log"
          element={<WorkoutForm token={token} setWorkouts={setWorkouts} />}
        />
        <Route path="/update-log" element={<UpdateForm />} />
      </Routes>
    </>
  );
};

export default Dashboard;
