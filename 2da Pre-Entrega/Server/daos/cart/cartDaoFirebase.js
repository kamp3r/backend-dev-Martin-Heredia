import FirebaseHandler from "../../container/firebaseHandler.js";

class CartDaoFirebase extends FirebaseHandler {
    constructor(){
        super("carts");
    }
}

export default CartDaoFirebase;

