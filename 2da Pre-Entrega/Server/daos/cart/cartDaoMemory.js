import MemoryHandler from "../../container/memoryHandler.js";
import configDB from "../../config/configDB.js";

class CartDaoMemory extends MemoryHandler {
    constructor() {
        super(configDB.memory.cart);
    }
}

export default CartDaoMemory;
