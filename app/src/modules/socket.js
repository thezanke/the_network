import { Socket } from 'phoenix';

const socket = new Socket('/socket', { params: { token: window.userToken } });

socket.connect();

export const createChannel = (...args) => socket.channel(...args);

export default socket;
