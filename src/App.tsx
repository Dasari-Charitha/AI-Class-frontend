import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Landing from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoleSelection from "./pages/RoleSelection";

import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import HODDashboard from "./pages/HODDashboard";
import PrincipalDashboard from "./pages/PrincipalDashboard";

import CreateExam from "./pages/CreateExam";
import TakeTest from "./pages/TakeTest";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute.tsx";
import AnimatedPage from "./components/AnimatedPage";
import StudyBackground from "./components/StudyBackground";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Landing /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><Signup /></AnimatedPage>} />
        <Route path="/select-role" element={<AnimatedPage><RoleSelection /></AnimatedPage>} />

        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRole="student">
                <AnimatedPage><StudentDashboard /></AnimatedPage>
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRole="teacher">
                <AnimatedPage><TeacherDashboard /></AnimatedPage>
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/hod"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRole="hod">
                <AnimatedPage><HODDashboard /></AnimatedPage>
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/principal"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRole="principal">
                <AnimatedPage><PrincipalDashboard /></AnimatedPage>
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-exam"
          element={
            <ProtectedRoute>
              <AnimatedPage><CreateExam /></AnimatedPage>
            </ProtectedRoute>
          }
        />

        <Route
          path="/take-test"
          element={
            <ProtectedRoute>
              <AnimatedPage><TakeTest /></AnimatedPage>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StudyBackground />
      <div className="relative z-10">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}