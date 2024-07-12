//combining multiple reducers
import {combineReducers} from 'redux'
import userReducer from './userReducer'
import alertReducer from './alertReducer';
import productReducer from '../reducers/productReducer' 
import allUserReducer from './allUserReducer';
import cartReducer from './cartReducer';
import displayCartReducer from './displayCartReducer';
import ordersReducer from './ordersReducer';
import addressReducer from './addressReducers';
import walletReducer from './walletReducer';
import couponReducer from './couponReducer';
import offerReducer from './offerReducer';


const myReducers = combineReducers({

    user: userReducer,
    alert: alertReducer,
    products: productReducer,
    allUser: allUserReducer,
    cart:cartReducer,
    isCart:displayCartReducer,
    orders: ordersReducer,
    address:addressReducer,
    wallet: walletReducer,
    coupons: couponReducer,
    offers: offerReducer,
});

export default myReducers;