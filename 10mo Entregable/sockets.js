import { Server as IOServer } from 'socket.io';


const socket = {}

const connect = (server)=>{
    socket.io = new IOServer(server);
}

export { connect, socket }
