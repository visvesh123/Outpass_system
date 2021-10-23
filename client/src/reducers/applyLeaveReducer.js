export default (state = [], action) => {
    switch (action.type) {
      case "APPLY_LEAVE":
        return action.payload;
  
      default:
        return state;
    }
  };
   