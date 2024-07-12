const cartReducer = (state = null,action) =>{
    switch(action.type){
        case "GET_CART_ITEMS":
            return state;

        case "SET_CART_ITEMS":
            return action.products;

        case "CLER_CART_ITEMS":
            return action.products;

            default :
            return state;
    }
}

export default cartReducer