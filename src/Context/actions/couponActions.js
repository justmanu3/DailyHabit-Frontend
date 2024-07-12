export const setAllCoupons = (coupons) => {
  return {
    type: "SET_ALL_COUPONS",
    coupons: coupons,
  };
};

export const getAllCoupons = () => {
  return {
    type: "GET_ALL_COUPONS",
  };
};
