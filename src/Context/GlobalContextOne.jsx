import React, { useEffect, useReducer, useContext, createContext } from "react";
import GlobalReducer from "../Reducer/GlobalReducerOne"; // adjust the path as needed

const initialState = {
  department_loading: false,
  notes: null,
  notes_loading: false,
  notes_error: false,
  departments: null,
  subject: {
    department: null,
    departmentCode: null,
    subject: null,
    subjectCode: null,
    topics: null,
    selectedTopic: null,
    selectedTopicCode: null,
  },
  department_error: false,
};

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const fetchMastInfo = async () => {
    dispatch({ type: "GET_SUBJECT_MASTER_INFO_BEGIN" });
    try {
      const response = await fetch(
        `https://railwaymcq.com/railwaymcq/RailPariksha/Department.php`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data);
      dispatch({ type: "GET_SUBJECT_MASTER_INFO_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching SUBJECT_MASTER info:", error);
      dispatch({ type: "GET_SUBJECT_MASTER_INFO_ERROR" });
    }
  };

  // https://railwaymcq.com/RailPariksha/mcq_Api.php?topicCode=101&subjectcode=100

  useEffect(() => {
    fetchMastInfo();
  }, []);
  const setSubject = (data) => {
    dispatch({ type: "SET_SUBJECT", payload: data });
  };

  const fetchNote = async () => {
    dispatch({ type: "GET_NOTES_BEGIN" });
    try {
      const response = await fetch(
        `https://railwaymcq.com/railwaymcq/RailPariksha/getPdfID.php`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch PDF ID");
      }
      const data = await response.json();
      dispatch({ type: "GET_NOTES_SUCCESS", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "GET_NOTES_ERROR" });
    }
  };
  useEffect(() => {
    fetchNote();
  }, []);
  return (
    <GlobalContext.Provider
      value={{ ...state, fetchMastInfo, setSubject, fetchNote }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext };
