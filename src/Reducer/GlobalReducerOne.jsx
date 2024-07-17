import Department from "../components/Department";

const GlobalReducer = (state, action) => {
  switch (action.type) {
    case "GET_SUBJECT_MASTER_INFO_BEGIN":
      return {
        ...state,

        department_loading: true,
      };
    case "GET_SUBJECT_MASTER_INFO_SUCCESS":
      return {
        ...state,
        department_loading: false,
        departments: action.payload,
      };
    case "GET_SUBJECT_MASTER_INFO_ERROR":
      return {
        ...state,
        department_loading: false,
        department_error: true,
      };
    case "GET_NOTES_BEGIN":
      return {
        ...state,

        notes_loading: true,
      };
    case "GET_NOTES_SUCCESS":
      return {
        ...state,
        notes_loading: false,
        notes: action.payload,
      };
    case "GET_NOTES_ERROR":
      return {
        ...state,
        notes_loading: false,
        notes_error: true,
      };
    case "SET_SUBJECT":
      const subObj = action.payload;
      return {
        ...state,
        subject: {
          department: subObj.department,
          departmentCode: subObj.departmentCode,
          subject: subObj.subject,
          queFrom: subObj.queFrom,
          subjectCode: subObj.subjectCode,
          topics: subObj.topics,
          selectedTopic: subObj.selectedTopic,
          selectedTopicCode: subObj.selectedTopicCode,
        },
      };
    case "SET_THREAD_DATA":
      return {
        ...state,
        thread: action.payload.thread || state.thread,
        selectedThread: action.payload.selectedThread || state.selectedThread,
      };
    case "SET_VIDEO_DATA":
      return {
        ...state,
        allVideos: action.payload.allVideos || state.allVideos,
        videoData: action.payload.videoData || state.videoData,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default GlobalReducer;
