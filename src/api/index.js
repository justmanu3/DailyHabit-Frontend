import axios from "axios";

//base url from the backend endpoint
export const baseURL = process.env.REACT_APP_BASE_URL;

export const validateUserJWTToken = async (token) => {
  try {
    console.log(token);
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error while validating user JWT token:", error);

    return null;
  }
};

//add new product

export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    return res.data.data;
  } catch (error) {
    console.error("Error while adding a new product:", error);

    return null;
  }
};

//edit the products

export const editAProduct = async (productId, data) => {
  try {
    const res = await axios.put(
      `${baseURL}/api/products/edit/${productId}`,
      data
    );
    return res.data.data;
  } catch (error) {
    console.error("Error while editing the product:", error);
    return null;
  }
};

//get all the products

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    return res.data.data;
  } catch (error) {
    console.error("Error while getting all products:", error);

    return null;
  }
};

//get categories

export const getCategories = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/categorystatuses`);
    return res.data.data;
  } catch (error) {
    console.error("Error while getting the categories:", error);
    return null;
  }
};

//deleting a product

export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error while deleting a product:", error);

    return null;
  }
};

//incrementing and decrementing stock count

export const editStockCount = async (productId, type) => {
  try {
    const res = await axios.put(
      `${baseURL}/api/products/updateStockCount/${productId}?type=${type}`
    );
    return res.data;
  } catch (error) {
    console.error("Error while editing the product:", error);
    return null;
  }
};

//get all users

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    return res.data.data;
  } catch (error) {
    console.error("Error while getting all users:", error);
    return null;
  }
};

//add product to the cart
//add new product to the cart

export const addNewProductToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return null;
  }
};

//getting all cart items

export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error getting product from the cart:", error);
    return null;
  }
};

//cart Increment and decrement

export const increaseItemQuantity = async (user_id, productId, type) => {
  console.log(user_id, productId, type);
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateCart/${user_id}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

/// block and unblock user

export const blockAndUnblockUser = async (uid, disabled) => {
  try {
    const res = await axios.put(`${baseURL}/api/users/blockUser/${uid}`, {
      disabled,
    });
    return res.data.data;
  } catch (error) {
    console.error("Error while Blocking or Unblocking user", error);
  }
};

// Update user password

export const updateUserPassword = async (uid, newPassword) => {
  try {
    const res = await axios.put(`${baseURL}/api/users/updatePassword/${uid}`, {
      password: newPassword,
    });
    return res.data.data;
  } catch (error) {
    console.error("Error while updating user password", error);
  }
};

//update user profilename (user profile)

export const updateUserProfile = async (uid, username) => {
  try {
    const res = await axios.put(`${baseURL}/api/users/updateProfile/${uid}`, {
      userName: username,
    });
    return res.data.data;
  } catch (error) {
    console.error("Error while updating user password", error);
  }
};

//all orders

export const getAllOrders = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/orders`);
    return res.data.data;
  } catch (error) {
    console.error("Error getting product from the cart:", error);
    return null;
  }
};

//update the order status

export const updateOrderSts = async (order_id, sts) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateOrder/${order_id}`,
      null,
      { params: { sts: sts } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//adding new address

export const addNewAddress = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/createaddress/${user_id}`,
      {
        ...data,
      }
    );
    return res.data.data;
  } catch (error) {
    console.error("Error while adding a new product:", error);

    return null;
  }
};

//getting all the addresses

export const getAllAddress = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/alladdress/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error while getting all products:", error);

    return null;
  }
};

//getting single address

export const getAddress = async (user_id, addressId) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/address/${user_id}/${addressId}`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error while getting the address:", error);
    return null;
  }
};

//deleting an address

export const deleteAnAddress = async (user_id, addressId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/deleteAddress/${user_id}/${addressId}`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error while deleting an address", error);

    return null;
  }
};

//editing address

// export const editAnAddress = async (user_id,addressId, data) => {
//   try {
//     const res = await axios.put(
//       `${baseURL}/api/products/editaddress/${user_id}/${addressId}`,
//       data
//     );
//     return res.data.data;
//   } catch (error) {
//     console.error("Error while editing the product:", error);
//     return null;
//   }
// };

//create cod order

export const codOrderPlacement = async (user_id, customer) => {
  console.log(user_id, customer);
  try {
    const res = await axios.post(
      `${baseURL}/api/products/createcodorder/${user_id}`,
      customer
    );
    return res.data;
  } catch (error) {
    console.error("Error while creating a new  order", error);
    return null;
  }
};

//activating user wallet

export const createWallet = async (user_id, date) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/createwallet/${user_id}`,
      { date }
    );
    return res.data.data;
  } catch (error) {
    console.error("Error while ccreating new wallet:", error);

    return null;
  }
};

//updating wallet

export const updateWalletAmount = async (user_id, total, walletId) => {
  console.log(user_id, total, walletId);
  try {
    const res = await axios.put(
      `${baseURL}/api/products/updatewallet/${user_id}`,
      null,
      { params: { total: total, walletId: walletId } }
    );
    return res.data;
  } catch (error) {
    console.error("Error while updating the wallet:", error);

    return null;
  }
};

//pay by wallet

export const orderByWallet = async (user_id, total, walletId) => {
  console.log(user_id, total, walletId);
  try {
    const res = await axios.put(
      `${baseURL}/api/products/paybywallet/${user_id}`,
      null,
      { params: { total: total, walletId: walletId } }
    );
    return res.data;
  } catch (error) {
    console.error("Error while updating the wallet:", error);

    return null;
  }
};

//getting user wallet

export const getWallet = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/userwallet/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error while getting the wallet:", error);
    return null;
  }
};

//add new coupon

export const addNewCoupon = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/createcoupon`, {
      ...data,
    });
    return res.data.data;
  } catch (error) {
    console.error("Error while adding a new coupon:", error);

    return null;
  }
};

//getting all coupons

export const getAllCoupons = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/allcoupons`);
    return res.data.data;
  } catch (error) {
    console.error("Error while getting all coupons:", error);

    return null;
  }
};

//getting single coupon

export const getACoupon = async (couponId) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/coupon/${couponId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error while getting the coupon:", error);
    return null;
  }
};

//deleting a coupon

export const deleteACoupon = async (couponId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/deletecoupon/${couponId}`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error while deleting a coupon:", error);

    return null;
  }
};


//add new offer module

export const addNewOffer = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/createoffer`, {
      ...data,
    });
    return res.data.data;
  } catch (error) {
    console.error("Error while adding a new offer:", error);

    return null;
  }
};

//getting all offers

export const getAllOffers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/alloffers`);
    return res.data.data;
  } catch (error) {
    console.error("Error while getting all offers:", error);

    return null;
  }
};

//getting single offer

export const getAnOffer = async (offerId) => {
  try {
    const res = await axios.get(`${baseURL}/api/products/offer/${offerId}`);
    return res.data;
  } catch (error) {
    console.error("Error while getting the offer:", error);
    return null;
  }
};

//deleting an offer

export const deleteAnOffer = async (offerId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/deleteoffer/${offerId}`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error while deleting an offer:", error);

    return null;
  }
};
