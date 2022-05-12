import FileHandler from "../../container/fileHandler.js";
import configDB from "../../config/configDB.js";

class CartDaoFile extends FileHandler {
    constructor() {
        super(configDB.fileSystem.cart);
    }
}

export default CartDaoFile;