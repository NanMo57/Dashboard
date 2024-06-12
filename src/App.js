import React from "react";
import { BrowserRouter } from "react-router-dom";

import './App.css'

import Dashboard from "./Admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
        <Dashboard />
    </BrowserRouter>
  );
}

export default App;
