const walletReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_WALLET":
      return state;

    case "SET_WALLET":
      return action.wallet;

    default:
      return state;
  }
};

export default walletReducer;
