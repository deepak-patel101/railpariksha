import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LogReg from "./pages/LogReg";
import Exam from "./pages/Exam";
import Navbar from "./NAVBAR/navbar";
import Notification from "./pages/Notification";
import Trending from "./pages/Trending";
import YourIdeas from "./pages/YourIdeas";
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
import FeedBackForAdmin from "./components/Admin/FeedBackForAdmin";
import PrivateRoute from "./components/PrivateRoute";
import Videos from "./pages/Videos";
import VideoPlayer from "./components/VideoPlayer";
import StartThread from "./components/Discussion/StartThread";
import TrendingVideos from "./components/Trendings/TrendingVideos";
import DeletedInspectionNotes from "./components/DeletedInspectionNotes";
import AddMcq from "./components/Dashboard/AddMcq";
import FeedBack from "./pages/FeedBack";
import { UserContext } from "./Context/UserContext"; // Import UserContext
import { useGlobalContext } from "./Context/GlobalContextOne";
import Loading from "./components/Loading";
import SignupInLoading from "./components/SignupInLoading";

const App = () => {
  const { user, updateUserData } = useContext(UserContext);
  const { activePage } = useGlobalContext();
  const [message, setMessage] = useState(false);
  const [messageTwo, setMessageTwo] = useState(false);
  const [saveToken, setToken] = useState(null);
  const token = localStorage.getItem("sessionToken");
  useEffect(() => {
    if (token !== "	undefined") {
      setToken(token);
    }
  }, [token]);
  useEffect(() => {
    const apiUrl =
      "https://railwaymcq.com/railwaymcq/RailPariksha/user_login_api.php";

    const handleLogin = async () => {
      if (!saveToken) {
        return;
      }
      setMessage(true);
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${saveToken}`,
        },
        body: JSON.stringify({ token: saveToken }),
      };

      try {
        const response = await fetch(apiUrl, requestData);
        const data = await response.json();

        if (data.success) {
          updateUserData(data.user);
          setMessage(false);

          // Handle successful login, e.g., save token, user data
        } else {
          setMessage(false);
          localStorage.removeItem("sessionToken");
        }
      } catch (error) {
        setMessage(false);

        console.error("Error:", error);
      }
    };

    handleLogin();
  }, [saveToken]); // Depend on saveToken so it runs when saveToken changes

  useEffect(() => {
    let sessionTimer;

    const resetTimer = () => {
      if (user) {
        clearTimeout(sessionTimer);
        sessionTimer = setTimeout(logoutUser, 10 * 60 * 1000); // 5 minutes
      }
    };

    const logoutUser = async () => {
      alert("Your session has expired. Signing out...");
      if (user) {
        setMessageTwo(true);
        try {
          const response = await fetch(
            "https://railwaymcq.com/railwaymcq/RailPariksha/sign_Out_User.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: saveToken }),
            }
          );

          const result = await response.json();
          setMessageTwo(false);

          if (result.success) {
            localStorage.removeItem("sessionToken"); // Remove the token from localStorage
          } else {
            alert("Failed to logout");
          }
        } catch (error) {
          setMessageTwo(false);

          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        }
        try {
          await fetch(
            "https://railwaymcq.com/railwaymcq/RailPariksha/userLogout.php"
          ); // Update URL as necessary

          updateUserData(null);
          // localStorage.removeItem("sessionToken");
        } catch (error) {
          console.error("Logout error:", error);
        }
      }
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    resetTimer(); // Start the timer on mount

    return () => {
      clearTimeout(sessionTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, [activePage, user, updateUserData]);

  return (
    <Router>
      {message && <SignupInLoading msg={"Signing In"} />}
      {messageTwo && <SignupInLoading msg={"Signing Out"} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/Dashboard/ADD-MCQ"
          element={<PrivateRoute element={<AddMcq />} />}
        />
        <Route
          path="/TestSeries"
          element={<PrivateRoute element={<Exam />} />}
        />
        <Route path="/Videos" element={<PrivateRoute element={<Videos />} />} />
        <Route
          path="/Videos/Video-Player"
          element={<PrivateRoute element={<VideoPlayer />} />}
        />
        <Route
          path="/TestSeries/Select-Test"
          element={<PrivateRoute element={<SelectTest />} />}
        />
        <Route
          path="/TestSeries/Select-Topics"
          element={<PrivateRoute element={<SelectTopics />} />}
        />
        <Route
          path="/TestSeries/Start-Test"
          element={<PrivateRoute element={<StartTest />} />}
        />
        <Route
          path="/TestSeries/Score-card"
          element={<PrivateRoute element={<ScoreCard />} />}
        />
        <Route
          path="/Add-Notes"
          element={<PrivateRoute element={<Notification />} />}
        />
        <Route
          path="/Trending"
          element={<PrivateRoute element={<Trending />} />}
        />
        <Route
          path="/Feedback"
          element={<PrivateRoute element={<FeedBack />} />}
        />
        <Route
          path="/Trending/Videos"
          element={<PrivateRoute element={<TrendingVideos />} />}
        />
        <Route
          path="/MyIdeas"
          element={<PrivateRoute element={<YourIdeas />} />}
        />
        <Route
          path="/MyIdeas/Start-Discussion"
          element={<PrivateRoute element={<StartThread />} />}
        />
        <Route
          path="/Add-Notes/DeletedInspectionNotes"
          element={<PrivateRoute element={<DeletedInspectionNotes />} />}
        />
        <Route path="/Log&Reg" element={<LogReg />} />
        <Route
          path="/Admin"
          element={<PrivateRoute element={<Admin />} adminOnly />}
        />
        <Route
          path="/Admin/Q-Bank"
          element={<PrivateRoute element={<QbankMaster />} adminOnly />}
        />
        <Route
          path="/Admin/Edit-Q-Bank"
          element={<PrivateRoute element={<EditQbank />} adminOnly />}
        />
        <Route
          path="/Admin/ShowFeedback"
          element={<PrivateRoute element={<ShowFeedback />} adminOnly />}
        />
        <Route
          path="/Admin/FatchQbankFeedback"
          element={<PrivateRoute element={<FatchQbankFeedback />} adminOnly />}
        />
        <Route
          path="/Admin/MCQverifier"
          element={<PrivateRoute element={<MCQverifier />} adminOnly />}
        />
        <Route
          path="/Admin/AddVideolinks"
          element={<PrivateRoute element={<AddVideolinks />} adminOnly />}
        />
        <Route
          path="/Admin/AddDept"
          element={<PrivateRoute element={<AddDept />} adminOnly />}
        />
        <Route
          path="/Admin/VideoApproval"
          element={<PrivateRoute element={<VideoApproval />} adminOnly />}
        />
        <Route
          path="/Admin/SummaryVideo"
          element={<PrivateRoute element={<SummaryVideo />} adminOnly />}
        />
        <Route
          path="/Admin/VideoModification"
          element={<PrivateRoute element={<VideoModification />} adminOnly />}
        />
        <Route
          path="/Admin/Feedback"
          element={<PrivateRoute element={<FeedBackForAdmin />} adminOnly />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
