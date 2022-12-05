import http from "http";
import express from "express";
import WebSocket from "ws";
import mongoose from "mongoose";
import mongo from "./mongo";
import wsConnect from "./wsConnect";
import { printChatBox } from "./utils/printInfo"

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

const chatBoxes = {};

db.once("open", () => {
    console.log("MongoDB connected!");
    wss.on("connection", (ws) => {
        console.log(`# of clients: ${wss.clients.size}`);
        ws.box = {
            active: "",
            inactive: new Set()
        }
        ws.onmessage = wsConnect.onMessage(ws, chatBoxes);
        ws.once("close", () => {
            if (chatBoxes[ws.box["active"]])
                chatBoxes[ws.box["active"]]["active"].delete(ws);
            ws.box["inactive"].forEach((box) => {
                if (chatBoxes[box])
                    chatBoxes[box]["inactive"].delete(ws);
            })

            printChatBox(chatBoxes);
            console.log(`# of clients: ${wss.clients.size}`);
        })
    })
})

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`);
});