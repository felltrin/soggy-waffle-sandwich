import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Dashboard from "@/pages/Dashboard.tsx";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar.tsx";
import { AppSidebar } from "./app-sidebar.tsx";
import WorkoutForm from "./WorkoutForm.tsx";

function Experience() {
  let token = null;

  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  }

  return (
    <>
      {!token ? (
        <>
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
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      ) : (
        <>
          {/* <SidebarProvider>
            <AppSidebar />
            <main>
              <SidebarTrigger /> */}
          {/* <Dashboard token={token} /> */}
          {/* <Router>
            <Link to="/workout-logging">
              <button className="w-32 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Add workout
              </button>
            </Link>
            <Routes>
              <Route
                path="/workout-logging"
                element={<WorkoutForm token={token} />}
              />
            </Routes>
          </Router> */}
          {/* </main>
          </SidebarProvider> */}
          <Routes>
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default Experience;
