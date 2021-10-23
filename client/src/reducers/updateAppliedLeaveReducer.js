export default (state = '', action) => {
    switch (action.type) {
      case "UPDATE_APPLIED_LEAVE":
        return action.payload;
  
      default:
        return state;
    }
  };
   