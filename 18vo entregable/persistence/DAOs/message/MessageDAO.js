const { Message } = require('../../../models/message');
const InterfaceMessage = require('./InterfaceMessage');
const MessageDTO = require('../../DTOs/MessageDto');

class MessageMongoDAO extends InterfaceMessage {
  constructor(DTO) {
    super();
    this.DTO = DTO;
    require('../../connection/connectionMongo.js');
  }
  async createMessage(message) {
    const { _id, author, messageText, date } = await Message.save(message);
    return new this.DTO(
      _id,
      author,
      messageText,
      date
    ).toJSON();
  }
  async getAll() {
    const messages = await Message.find()
      .lean()
      .exec();
    return messages.map((message) => {
      return new this.DTO(
        message._id,
        message.author,
        message.message,
        message.date
      ).toJSON();
    });
  }
}

module.exports = MessageMongoDAO(MessageDTO);
