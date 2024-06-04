import React, { useContext, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { io } from "socket.io-client";
import AppContext, { AppState } from './AppContext';
import debug from './logger';
import socketClient from './socket-client';
import { RouterProvider } from 'react-router-dom';
import router from './router';


function ReactApp() {

  const socket = socketClient();

  const [appstate] = useState({
    socket: socket
  } as AppState)
  const appContext: typeof AppContext = AppContext

  return (
    <AppContext.Provider value={appstate}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
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