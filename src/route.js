import React from "react";
import { Routes, Switch, Route, Link } from "react-router-dom";
import Home from "./page/home";

const BasicRouter = () => (
  <Routes>
    <Route path="/home" element={<Home />} />
  </Routes>
);

export default BasicRouter;
