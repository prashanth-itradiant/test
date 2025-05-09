// src/App.jsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import DragDropBoard from "./KanbanBoard";
import LiftSystem from "./LiftSystem";
import EmployeeQRList from "./qrgenrator/EmployeeQRList";
import Tabs from "./tabs/Tabs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tabs />} />
        <Route path="/dashboard" element={<DragDropBoard />} />
        <Route path="/qr" element={<EmployeeQRList />} />
        <Route path="/lift" element={<LiftSystem />} />
      </Routes>
    </Router>
  );
}

export default App;
