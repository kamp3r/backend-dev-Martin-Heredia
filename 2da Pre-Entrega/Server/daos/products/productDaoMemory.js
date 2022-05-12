import MemoryHandler from "../../container/memoryHandler.js";
import configDB from "../../config/configDB.js";

class ProductDaoMemory extends MemoryHandler {
    constructor() {
        super(configDB.memory.products);
    }
}


export default ProductDaoMemory;