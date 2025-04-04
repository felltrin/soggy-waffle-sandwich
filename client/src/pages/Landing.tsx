import { Link, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, BarChart2, Calendar, Clock, Users } from "lucide-react";
import Login from "./Login";
import Register from "./Register";

export default function Landing() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" to="#">
            <Dumbbell className="h-6 w-6 mr-2" />
            <span className="font-bold">Worf</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              to="#"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              to="#"
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              to="#"
            >
              About
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              to="#"
            >
              Contact
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Track Your Fitness Journey
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Worf helps you monitor your workouts, set goals, and achieve
                    your fitness dreams. Start your journey today!
                  </p>
                </div>
                <div className="space-x-4">
                  <Button>Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Features
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start mx-auto max-w-6xl">
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <BarChart2 className="h-12 w-12 mb-2 text-primary" />
                  <h3 className="text-xl font-bold">Progress Tracking</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Monitor your fitness progress with detailed charts and
                    analytics
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <Calendar className="h-12 w-12 mb-2 text-primary" />
                  <h3 className="text-xl font-bold">Workout Planner</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Plan and schedule your workouts with our intuitive calendar
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <Clock className="h-12 w-12 mb-2 text-primary" />
                  <h3 className="text-xl font-bold">Timer & Stopwatch</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Time your workouts and rest periods with precision
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <Users className="h-12 w-12 mb-2 text-primary" />
                  <h3 className="text-xl font-bold">Community Support</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Connect with other fitness enthusiasts and share your
                    journey
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Start Your Fitness Journey Today
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Join thousands of users who have transformed their lives
                    with Worf. Sign up now and get your first month free!
                  </p>
                  <div className="space-x-4">
                    <Link to="/register">
                      <Button className="cursor-pointer">Register</Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="cursor-pointer">
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Worf. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" to="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" to="#">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
