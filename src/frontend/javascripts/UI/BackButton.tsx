import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomeButton({ title, onBeforeHome, onBeforeHomeDone }: { title: string, onBeforeHome: Function, onBeforeHomeDone: boolean }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (onBeforeHomeDone) {
      navigate("/");
    }
  })

  function goHome() {
    if (onBeforeHome) {
      onBeforeHome()
    } else {
      navigate("/");
    }
  }

  return (
    <button onClick={goHome}>{title}</button>
  );
}

export default HomeButton