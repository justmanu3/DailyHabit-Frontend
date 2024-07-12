export const setWallet = (wallet) => {
  return {
    type: "SET_WALLET",
    wallet: wallet,
  };
};

export const getWallet = () => {
  return {
    type: "GET_WALLET",
  };
};
