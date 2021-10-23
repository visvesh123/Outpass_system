export default (state = '', action) => {
    switch (action.type) {
      case "FETCH_STUDENT_VAC":
        return action.payload;
  
      default:
        return state;
    }
  };
   