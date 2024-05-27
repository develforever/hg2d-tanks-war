import React from 'react';
import { createRoot } from 'react-dom/client';

function MyButton({ title }: { title: string }) {
    return (
      <button>{title}</button>
    );
  }
  
function ReactApp() {
    return (
      <div>
        <h1>Welcome to my app</h1>
        <MyButton title="I'm a button" />
      </div>
    );
  }


export default function () {

    const elm = document.getElementById('app')
    if (elm) {
        const root = createRoot(elm);
        root.render(<ReactApp />);
    }


}