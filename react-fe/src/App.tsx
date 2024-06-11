import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState(null);
  const [currMessage, setCurrMessage] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socket.onopen = () => {
      console.log("connection established");
      console.log(socket);
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log(message);
      setMessage(message.data);
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!socket) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <input
        onChange={(e) => {
          setCurrMessage(e.target.value);
        }}
      />
      <button
        onClick={() => {
          socket.send(currMessage);
        }}
      >
        Send
      </button>
      <div>{message}</div>
    </div>
  );
}

export default App;
