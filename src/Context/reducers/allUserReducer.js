const allUserReducer = (state= null,action)=>{

    
    switch(action.type){
        case "GET_ALL_USER" :
            return state;

        case "SET_ALL_USER" :
            return action.allUser;


            //   if (action.payload && action.payload.allUser) {
            //     return action.payload.allUser;
            // }
            // return state;
            
        default :
        return state;    
    }
}

export default allUserReducer;