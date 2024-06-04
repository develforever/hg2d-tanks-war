import React from 'react'
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter
} from "react-router-dom";
import StartGameButton from "./UI/StartButton";
import Home from './Router/Home';
import Game from './Router/Game';


const router = createHashRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/game",
    element: <Game></Game>,
  }
]);

export default router