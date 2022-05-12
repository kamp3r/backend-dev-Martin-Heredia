import FileHandler from "../../container/fileHandler.js";
import configDB from "../../config/configDB.js";

class ProductDaoFile extends FileHandler {
    constructor() {
        super(configDB.fileSystem.products);
    }
}


export default ProductDaoFile;