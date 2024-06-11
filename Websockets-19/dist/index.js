"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const server = app.listen(3000);
app.get("/", (req, res) => {
    res.send("Root route");
});
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(message, { binary: false });
            }
        });
    });
    ws.send("Hello! Welcome to the WebSocket server.");
});
