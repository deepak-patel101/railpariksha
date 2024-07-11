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
import SelectTopics from "./pages/SelectTopics";
import SelectTest from "./pages/SelectTest";
import StartTest from "./pages/StartTest";
import ScoreCard from "./pages/ScoreCard";
import Admin from "./pages/Admin";
import QbankMaster from "./components/Admin/QbankMaster";
import ShowFeedback from "./components/Admin/ShowFeedback";
import FatchQbankFeedback from "./components/Admin/FatchQbankFeedback";
import MCQverifier from "./components/Admin/MCQverifier";
import EditQbank from "./components/Admin/EditQbank";
import AddVideolinks from "./components/Admin/AddVideolinks";
import AddDept from "./components/Admin/AddDept";
import VideoApproval from "./components/Admin/VideoApproval";
import SummaryVideo from "./components/Admin/SummaryVideo";
import VideoModification from "./components/Admin/VideoModification";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/TestSeries" element={<Exam />} />
        <Route path="/TestSeries/Select-Test" element={<SelectTest />} />
        <Route path="/TestSeries/Select-Topics" element={<SelectTopics />} />
        <Route path="/TestSeries/Start-Test" element={<StartTest />} />
        <Route path="/TestSeries/Score-card" element={<ScoreCard />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/MyIdeas" element={<YourIdeas />} />
        <Route path="/Log&Reg" element={<LogReg />} />
        <Route path="/Admin" element={<PrivateRoute element={<Admin />} />} />
        <Route
          path="/Admin/Q-Bank"
          element={<PrivateRoute element={<QbankMaster />} />}
        />
        <Route
          path="/Admin/Edit-Q-Bank"
          element={<PrivateRoute element={<EditQbank />} />}
        />
        <Route
          path="/Admin/ShowFeedback"
          element={<PrivateRoute element={<ShowFeedback />} />}
        />
        <Route
          path="/Admin/FatchQbankFeedback"
          element={<PrivateRoute element={<FatchQbankFeedback />} />}
        />
        <Route
          path="/Admin/MCQverifier"
          element={<PrivateRoute element={<MCQverifier />} />}
        />
        <Route
          path="/Admin/AddVideolinks"
          element={<PrivateRoute element={<AddVideolinks />} />}
        />
        <Route
          path="/Admin/AddDept"
          element={<PrivateRoute element={<AddDept />} />}
        />
        <Route
          path="/Admin/VideoApproval"
          element={<PrivateRoute element={<VideoApproval />} />}
        />
        <Route
          path="/Admin/SummaryVideo"
          element={<PrivateRoute element={<SummaryVideo />} />}
        />
        <Route
          path="/Admin/SummaryVideo"
          element={<PrivateRoute element={<SummaryVideo />} />}
        />

        <Route
          path="/Admin/VideoModification"
          element={<PrivateRoute element={<VideoModification />} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
