import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";

function StartGameButton({ title }: { title: string }) {

    const appState = useContext(AppContext);
    const navigate = useNavigate();

    function startGame(){
        navigate("/game");
    }

    return (
      <button onClick={startGame}>{title}</button>
    );
  }

  export default StartGameButton