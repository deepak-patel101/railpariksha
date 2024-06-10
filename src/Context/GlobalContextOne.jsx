import React, { useEffect, useReducer, useContext, createContext } from "react";
import GlobalReducer from "../Reducer/GlobalReducerOne"; // adjust the path as needed

const initialState = {
  department_loading: false,
  departments: null,
  subject: null,
  department_error: false,
};

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const fetchMastInfo = async () => {
    dispatch({ type: "GET_SUBJECT_MASTER_INFO_BEGIN" });
    try {
      const response = await fetch(
        `https://railwaymcq.com/student/subject_api.php`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      dispatch({ type: "GET_SUBJECT_MASTER_INFO_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching SUBJECT_MASTER info:", error);
      dispatch({ type: "GET_SUBJECT_MASTER_INFO_ERROR" });
    }
  };

  useEffect(() => {
    fetchMastInfo();
  }, []);
  const setSubject = (data) => {
    dispatch({ type: "SET_SUBJECT", payload: data });
  };

  return (
    <GlobalContext.Provider value={{ ...state, fetchMastInfo, setSubject }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext };
