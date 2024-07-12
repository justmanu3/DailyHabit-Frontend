export const setAllAddress = (address) => {
  return {
    type: "SET_ALL_ADDRESS",
    address: address,
  };
};

export const getAllAddress = () => {
  return {
    type: "GET_ALL_ADDRESS",
  };
};
