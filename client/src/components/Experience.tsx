import React, {useState} from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Dashboard from "@/pages/Dashboard.tsx";


function Experience() {
  const [token, setToken] = useState(null);

  return (
    <>
      {!token ? (
        <>
          <Router>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/register">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Register
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Routes>
              <Route path="/" element={<Login setToken={setToken}/>}/>
              <Route path="/register" element={<Register setToken={setToken}/>}/>
            </Routes>
          </Router>
        </>
      ) : (
        <>
          <Dashboard token={token} />
        </>
      )}
    </>);
}

export default Experience;