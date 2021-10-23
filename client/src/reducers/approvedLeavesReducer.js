export default (state = [], action) => {
    switch (action.type) {
      case "FETCH_APPROVED_LEAVES":
        return action.payload ;
  
      default:
        return state;
    }
  };
   

  