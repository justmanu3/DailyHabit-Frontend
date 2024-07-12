const addressReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_ADDRESS":
      return state;

    case "SET_ALL_ADDRESS":
      return action.address;

    default:
      return state;
  }
};

export default addressReducer;
