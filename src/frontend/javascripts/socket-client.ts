import { io } from "socket.io-client";
import debug from "./logger";




export default function () {
    const socket = io();

    socket.on('connect', () => {
        debug("io connected")
    });

    return socket
}