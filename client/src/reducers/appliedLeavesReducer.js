export default (state = [], action) => {
    switch (action.type) {
      case "FETCH_APPLIED_LEAVES":
        return action.payload ;
  
      default:
        return state;
    }
  };
   

  