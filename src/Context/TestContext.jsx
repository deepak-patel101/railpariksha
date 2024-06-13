import React, { useEffect, useReducer, useContext, createContext } from "react";
import TestReducer from "../Reducer/TestReducer";
import { useGlobalContext } from "./GlobalContextOne";
const initialState = {
  test_loading: false,
  test_data: null,
  test_error: false,
};

const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TestReducer, initialState);
  const { subject } = useGlobalContext();

  const fetchTestInfo = async () => {
    console.log(
      `https://railwaymcq.com/RailPariksha/mcq_Api.php?topicCode=${subject.selectedTopicCode}&subjectcode=${subject.subjectCode}`
    );
    dispatch({ type: "GET_TEST_MASTER_INFO_BEGIN" });
    try {
      const response = await fetch(
        ` https://railwaymcq.com/RailPariksha/mcq_Api.php?topicCode=${subject.selectedTopicCode}&subjectcode=${subject.subjectCode}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dispatch({ type: "GET_TEST_MASTER_INFO_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching SUBJECT_MASTER info:", error);
      dispatch({ type: "GET_TEST_MASTER_INFO_ERROR" });
    }
  };

  // https://railwaymcq.com/RailPariksha/mcq_Api.php?topicCode=101&subjectcode=100

  useEffect(() => {
    fetchTestInfo();
  }, [subject.subjectCode, subject.selectedTopicCode]);

  return (
    <TestContext.Provider value={{ ...state, fetchTestInfo }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => {
  return useContext(TestContext);
};

export { TestContext };
