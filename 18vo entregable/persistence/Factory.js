const logger = require('../../utils/logger/logger');
const { configuration } = require('../../config/config');

class Factory {
    static getPersistence(persistenceType, model){
        try{
        if(persistenceType === 'mongo'){
            return require(`./DAOs/${model}/${model}DAO`)
        }
        }catch(err){
            logger.error(err);
            throw err;
        }
    }
}

const persistenceType = configuration.persistance

module.exports = (model) => {
    return Factory.getPersistence(persistenceType, model);
}