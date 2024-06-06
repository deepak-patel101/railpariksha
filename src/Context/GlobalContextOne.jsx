import React, { useEffect, useReducer, useContext, createContext } from "react";
import GlobalReducer from "../Reducer/GlobalReducerOne"; // adjust the path as needed

const initialState = {
  department_loading: false,
  department: null,
  department_error: false,
};

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const fetchMastInfo = async () => {
    dispatch({ type: "GET_MAST_INFO_BEGIN" });
    try {
      const response = await fetch(
        `https://railwaymcq.com/student/deptt_api.php`
      );
      console.log(response.data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      dispatch({ type: "GET_MAST_INFO_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching mast info:", error);
      dispatch({ type: "GET_MAST_INFO_ERROR" });
    }
  };

  useEffect(() => {
    fetchMastInfo();
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state, fetchMastInfo }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext };
