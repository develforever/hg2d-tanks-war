import { createContext } from "react";
import { Socket } from "socket.io-client";


export type AppState = {
    socket:Socket
}

const AppContext = createContext({} as AppState);

export default AppContext