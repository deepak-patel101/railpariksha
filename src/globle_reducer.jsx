const globalReducer = (state, action) => {
  switch (action.type) {
    case "GET_MAST_INFO_BEGIN":
      return {
        ...state,
        masterData_loading: true,
        masterData_error: false,
      };
    case "GET_MAST_INFO_SUCCESS":
      return {
        ...state,
        masterData_loading: false,
        masterData: action.payload,
        masterData_error: false,
      };
    case "GET_MAST_INFO_ERROR":
      return {
        ...state,
        masterData_loading: false,
        masterData_error: true,
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default globalReducer;
