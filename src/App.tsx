import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { FoxyDrake, Login, Main } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/dao/foxy-drake" element={<FoxyDrake />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
