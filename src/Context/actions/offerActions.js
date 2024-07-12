export const setAllOffers = (offers) => {
  return {
    type: "SET_ALL_OFFERS",
    offers: offers,
  };
};

export const getAllOffers = () => {
  return {
    type: "GET_ALL_OFFERS",
  };
};
