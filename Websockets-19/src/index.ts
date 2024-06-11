import { WebSocket, WebSocketServer } from "ws";
import express from "express";

const app = express();

const server = app.listen(3000);

app.get("/", (req, res) => {
  res.send("Root route");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: false });
      }
    });
  });

  ws.send("Hello! Welcome to the WebSocket server.");
});
