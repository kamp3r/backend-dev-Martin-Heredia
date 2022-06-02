import ChatHandler from "./chat/ChatHandler.js";
import UserHandler from "./user/userHandler.js";

export const chatHandler = new ChatHandler();
export const userDao = new UserHandler();
