import React from "react";
<<<<<<< HEAD
import { NavLink, Route, Routes } from "react-router-dom";
=======
import { NavLink, Routes, Route } from "react-router-dom";
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
import ResumeFormPage from "./pages/ResumeFormPage.jsx";
import PreviewPage from "./pages/PreviewPage.jsx";
import ControlPanelPage from "./pages/ControlPanelPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <div className="container">
        <nav className="top-nav">
<<<<<<< HEAD
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
=======
          <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
            Resume Form
          </NavLink>

          <NavLink
            to="/preview"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Printable Preview
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<ResumeFormPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/control-panel" element={<ControlPanelPage />} />
        </Routes>
      </div>
    </div>
  );
}