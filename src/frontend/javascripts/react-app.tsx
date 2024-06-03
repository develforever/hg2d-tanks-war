import React, { useContext, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { io } from "socket.io-client";
import AppContext, {AppState} from './AppContext';
import debug from './logger';
import socketClient from './socket-client';

function MyButton({ title }: { title: string }) {

  const appState = useContext(AppContext);
  debug(appState)
  return (
    <button>{title}</button>
  );
}

function ReactApp() {

  const socket = socketClient();
  
  const [appstate, setAppState] = useState({
    socket: socket
  } as AppState)
  const appContext: typeof AppContext = AppContext

  return (
    <AppContext.Provider value={appstate}>
      <div>
        <h1>Welcome to my app</h1>
        <MyButton title="I'm a button" />
      </div>
    </AppContext.Provider>
  );
}


export default function () {

  const elm = document.getElementById('app')
  if (elm) {
    const root = createRoot(elm);
    root.render(<ReactApp />);
  }


}