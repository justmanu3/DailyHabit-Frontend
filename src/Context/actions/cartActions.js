export const setCartItems = (products) =>{
    return {
        type: "SET_CART_ITEMS",
        products: products,
    }
}


export const getCartItems = () =>{
    return {
        type: "GET_CART_ITEMS",
    }
}


export const clearCartItems = () =>{
    return {
        type: "CLEAR_CART_ITEMS",
        products: null,
    }
}