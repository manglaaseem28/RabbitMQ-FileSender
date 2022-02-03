import LandingPage from "./components/landingPage/LandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isAuthenticated, setisAuthenticated] = useState(user ? true : false);

  return (
    <Router>
      <div className="App">
        {/* <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
        </ul> */}
        <Routes>
          <Route exact path="/" element={<LandingPage isAuthenticated={isAuthenticated} />}></Route>
          <Route
            exact
            path="/dashboard"
            element={isAuthenticated ? <Dashboard isAuthenticated={isAuthenticated}/> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
