const couponReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_COUPONS":
      return state;

    case "SET_ALL_COUPONS":
      return action.coupons;

    default:
      return state;
  }
};

export default couponReducer;
