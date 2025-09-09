import { BrowserRouter as Router } from "react-router-dom";
import Experience from "./components/Experience.tsx";

export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:8080"
    : "https://soggy-waffle-sandwich.onrender.com";

function App() {
  return (
    <Router>
      <Experience />
    </Router>
  );
}

export default App;
