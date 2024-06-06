const GlobalReducer = (state, action) => {
  switch (action.type) {
    case "GET_MAST_INFO_BEGIN":
      return {
        ...state,

        department_loading: true,
      };
    case "GET_MAST_INFO_SUCCESS":
      return {
        ...state,
        department_loading: false,
        department: action.payload,
      };
    case "GET_MAST_INFO_ERROR":
      return {
        ...state,
        department_loading: false,
        department_error: true,
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default GlobalReducer;
