export default (state = [], action) => {
    switch (action.type) {
      case "FETCH_STUDENT":
        return [action.payload ];
  
      default:
        return state;
    }
  };
   