import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./lib/ProtectedRoute";
import { HomePage } from "./components/home";
import LoginPage from "./pages/LoginPage";
import { RootState } from "./store";
import { useAppSelector } from "./hooks/redux";

const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.application);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
