const offerReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_OFFERS":
      return state;

    case "SET_ALL_OFFERS":
      return action.offers;

    default:
      return state;
  }
};

export default offerReducer;
