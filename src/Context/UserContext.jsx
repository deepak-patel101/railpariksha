import React, { useReducer, useContext, createContext } from "react";
import UserReducer from "../Reducer/UserReducer"; // Make sure this path is correct

const initialState = {
  user: null,
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const updateUserData = (data) => {
    dispatch({ type: "SET_USER", payload: data });
  };

  return (
    <UserContext.Provider value={{ ...state, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext };
