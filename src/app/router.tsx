import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Home } from "@/pages/home";
import { Profile } from "@/pages/profile";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
};
