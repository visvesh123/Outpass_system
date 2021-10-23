export default (state = '', action) => {
    switch (action.type) {
      case "UPDATE_APPROVED_LEAVE":
        return action.payload;
  
      default:
        return state;
    }
  };
   