import React, { useEffect, useReducer, useContext } from "react";
import reducer from "../reducer/global_reducer";

const initialState = {
  masterData_loading: false,
  masterData: null,
  masterData_error: false,
};
const GlobalContext = React.createContext();
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchMastInfo = async () => {
    dispatch({ type: "GET_MAST_INFO_BEGIN" });
    // console.log("loading true");
    try {
      // https://railwaymcq.com/ohe/location_maintenance_api.php
      const response = await fetch(
        `https://railwaymcq.com/ohe/universal_mast_API.php?tableName=`
      );
      const data = await response.json();
      // let data = [];

      // console.log(data);
      // console.log("loading false");
      dispatch({ type: "GET_MAST_INFO_SUCCESS", payload: data });
    } catch (error) {
      // console.log("error while loading ");
      dispatch({ type: "GET_MAST_INFO_ERROR" });
    }
  };

  useEffect(() => {
    fetchMastInfo();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        ...state,

        fetchMastInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
