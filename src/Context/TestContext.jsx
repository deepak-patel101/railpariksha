import React, { useEffect, useReducer, useContext, createContext } from "react";
import TestReducer from "../Reducer/TestReducer";
import { useGlobalContext } from "./GlobalContextOne";
import CountdownTimer from "../components/CountdownTimer";

const initialState = {
  test_loading: false,
  test_data: null,
  temp_test_data: null,
  test_error: false,
  defaultActiveBtn: "All",
  start_Test: {
    test: {},
    timing: null,
    activeQuestion: 0,
  },
  userResponse: {
    testAnswer: {},
  },
  countDown: {
    testTiming: null,
    timeTaken: null,
    remainingTime: null,
  },
};
const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TestReducer, initialState);
  const { subject } = useGlobalContext();
  const fetchTestInfo = async () => {
    dispatch({ type: "GET_TEST_MASTER_INFO_BEGIN" });
    try {
      const response = await fetch(
        `https://railwaymcq.com/railwaymcq/RailPariksha/mcq_Api.php?topicCode=${subject.selectedTopicCode}&subjectcode=${subject.subjectCode}&queFrom=${subject.queFrom}`
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

  const SetStartTestData = (data) => {
    dispatch({ type: "SET_START_TEST", payload: data });
  };

  const updateActiveQuestion = (activeQuestion) => {
    dispatch({ type: "UPDATE_ACTIVE_QUESTION", payload: activeQuestion });
  };
  const updateActiveQuestionStatus = (activeQuestionStatus) => {
    dispatch({
      type: "UPDATE_ACTIVE_QUESTION_Status",
      payload: activeQuestionStatus,
    });
  };
  const updateUserResponse = (userResponse) => {
    dispatch({
      type: "UPDATE_USER_RESPONSE",
      payload: userResponse,
    });
  };
  const updateCountDown = (countdownTimer) => {
    dispatch({ type: "UPDATE_COUNTDOWN_TIMER", payload: countdownTimer });
  };
  const setTempTest = (data) => {
    dispatch({ type: "SET_TEMP_TEST_DATA", payload: data });
  };
  const setDefaultActiveBtn = (data) => {
    dispatch({ type: "SET_ACTIVE_BTN_FOR_TEST_LIST", payload: data });
  };
  useEffect(() => {
    fetchTestInfo();
  }, [subject.subjectCode, subject.selectedTopicCode]);

  return (
    <TestContext.Provider
      value={{
        ...state,
        fetchTestInfo,
        SetStartTestData,
        updateActiveQuestion,
        updateActiveQuestionStatus,
        updateUserResponse,
        updateCountDown,
        setTempTest,
        setDefaultActiveBtn,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => {
  return useContext(TestContext);
};

export { TestContext };
