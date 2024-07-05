const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      const userData = action.payload;
      return {
        ...state,
        user: userData,
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default UserReducer;
