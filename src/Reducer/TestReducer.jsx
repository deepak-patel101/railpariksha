const TestReducer = (state, action) => {
  switch (action.type) {
    case "GET_TEST_MASTER_INFO_BEGIN":
      return {
        ...state,

        test_loading: true,
      };
    case "GET_TEST_MASTER_INFO_SUCCESS":
      return {
        ...state,
        test_loading: false,
        test_data: action.payload,
      };
    case "GET_TEST_MASTER_INFO_ERROR":
      return {
        ...state,
        test_loading: false,
        test_error: true,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default TestReducer;
