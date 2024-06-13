import React from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LogReg from "./pages/LogReg";
import Exam from "./pages/Exam";
import Navbar from "./NAVBAR/navbar";
import Notification from "./pages/Notification";
import Trending from "./pages/Trending";
import YourIdeas from "./pages/YourIdeas";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./NAVBAR/Footer";
import SelectTopics from "./components/SelectTopics";
import SelectTest from "./components/SelectTest";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/TestSeries" element={<Exam />} />
          <Route path="/TestSeries/Select-Test" element={<SelectTest />} />
          <Route path="/TestSeries/Select-Topics" element={<SelectTopics />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/Trending" element={<Trending />} />
          <Route path="/MyIdeas" element={<YourIdeas />} />

          <Route path="/Log&Reg" element={<LogReg />} />
        </Routes>{" "}
        <Footer />
      </Router>{" "}
    </>
  );
}

export default App;
