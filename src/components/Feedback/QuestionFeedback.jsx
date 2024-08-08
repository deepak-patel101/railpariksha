import React, { useState } from "react";
import axios from "axios";
import { useUserContext } from "../../Context/UserContext";
import { useGlobalContext } from "../../Context/GlobalContextOne";
const QuestionFeedback = ({ questionData }) => {
  const { user } = useUserContext();
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("Mcq"); // Default feedback type
  const { subject } = useGlobalContext();
  const handleChange = (event) => {
    setFeedback(event.target.value);
  };
  const handleFeedback = async () => {
    if (!feedback || /^\s*$/.test(feedback)) {
      alert("Please enter your feedback.");
      return;
    }
    console.log(questionData);
    const formData = {
      qcode: questionData.qcode,
      subcode: subject.subjectCode,
      topcode: subject.selectedTopicCode,
      feedback: feedback,
      feedback_type: feedbackType,
      feedback_by: user.id,
      // Add any other columns here
    };
    console.log(formData);
    try {
      const response = await axios.post(
        "https://railwaymcq.com/railwaymcq/RailPariksha/Feedback.php",
        formData
      );
      alert("Feedback Added successfully!");
      console.log(response.data);
      setFeedback("");
    } catch (error) {
      console.error(error);
      alert("Failed to Add Feedback!");
    }
  };

  return (
    <div className="container mt-5">
      {questionData.question}
      <textarea
        type="text"
        name="feedback"
        value={feedback}
        onChange={handleChange}
        placeholder="Feel free to enter your feedback about this question......"
        className="form-control"
        id="myBox"
        rows="2"
        col="8"
      ></textarea>
      <button onClick={handleFeedback} className="btn btn-outline-danger">
        Submit Feedback
      </button>
    </div>
  );
};
export default QuestionFeedback;
