const logger = require('../utils/logger/logger');

class DAOFactory {
    static getPersistence(entity, persistence) {
        try {
            const Përsistence = require(`./${entity}/${persistence}`);
            return Përsistence.getInstance();
        }catch(err){
            logger.error(`Error loading ${entity} persistence`, err);
        }
}
}

module.exports = DAOFactory;