import FirebaseHandler from "../../container/firebaseHandler.js";

class ProductDaoFirebase extends FirebaseHandler{
    constructor(){
        super("products");
    }
}

export default ProductDaoFirebase;
