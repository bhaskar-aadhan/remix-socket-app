import { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { io } from "socket.io-client";
import { useSocket } from "~/context";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export default function Index() {
  const socket = io();
  const [ message, setMessage ] = useState("")
  const [ messageReceived, setMessageReceived ] = useState("")

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (data) => {
      console.log("client socket", data);
      setMessageReceived(data)
    });
  }, [socket]);
  return (
   <div>
    <input onChange={(e)=>{e.preventDefault(); setMessage(e.target.value)}} type="text" placeholder="SendMessage....." />
    <button onClick={(e)=>{e.preventDefault(); socket.emit("event", { message: message })}}>Submit</button>
    <br /><br /><br />
    <h3>Received Message: {messageReceived}</h3>
   </div>
  );
}
