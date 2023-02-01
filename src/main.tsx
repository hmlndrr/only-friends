import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

(window as any).help = () => {
  console.log(`
  Hey there, welcome to My Task, I am Niemand the creator of this task.
  I created this task to have a little practice with your skills in Web Development.
  There is no Weird Vulnerability or SQL Injection or XSS or anything like that.
  I just made a little mistake while writing this website. 
  Think of it like a Bad Habit That I don't want you to do when building your apps.

  To have a better understanding of what to do, answer these question:

  -> What kind of request am I sending once you login? Is there things that sounds should have been a secret?
  
  I hope you enjoy this task and learn something new. See you later..

  `);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
