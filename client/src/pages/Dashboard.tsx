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

  // TODO: the buttons that use this must be changed
  const buttonClick = () => {
    console.log("You clicked the button!");
    console.log(location.pathname);
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
            <button
              className="bg-red-500 text-white flex items-center gap-2 px-8 py-1 rounded-md hover:bg-red-600"
              onClick={signOutButton}
            >
              Sign out
            </button>
          </div>
          {/* <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"> */}
          <Link to="/workout-log">
            <button
              className="px-8 py-1 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600"
              onClick={buttonClick}
            >
              <Plus className="w-5 h-5" />
              Add workout
            </button>
          </Link>
          {workouts.map((workout, index) => (
            <div key={index}>
              <span>{workout.created} </span>
              <span>{workout.distance}km </span>
              <span>{workout.duration} minute(s)</span>
              <button>
                <SquarePen className="w-5 h-5 mx-2" onClick={buttonClick} />
              </button>
              <button>
                <Trash2 className="w-5 h-5 mx-2" onClick={buttonClick} />
              </button>
              <br></br>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
      <Routes>
        <Route path="/workout-log" element={<WorkoutForm token={token} />} />
      </Routes>
    </>
  );
};

export default Dashboard;
