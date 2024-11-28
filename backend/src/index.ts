import express, { Request, Response } from "express";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { createClient } from "redis";
import cors from "cors";
import { CHAT, JOIN_ROOM } from "./messageTypes";

const app = express();

app.use(express.json());

dotenv.config({ path: "./.env" });
app.use(cors({ origin: process.env.CORS_ORIGIN }));

const httpServer = app.listen(process.env.PORT, async () => {
  console.log(`Sever started on port: ${process.env.PORT}`);
});

const publisher = createClient({ url: "redis://localhost:6379" });
const subscriber = createClient({ url: "redis://localhost:6379" });
const redisClient = createClient({ url: "redis://localhost:6379" });

app.get("/add-rooms/:roomId", async (req, res) => {
  const { roomId } = req.params;
  if (roomId === "") {
    res.send("please provide a valid room id");
    return;
  }
  await redisClient.sAdd("validRooms", roomId);
  res.send(`Room ${roomId} created!`);
});

app.get("/valid-rooms", async (req, res) => {
  const rooms = await redisClient.sMembers("validRooms");
  res.json({ validRooms: rooms });
});

(async () => {
  await publisher.connect();
  await subscriber.connect();
  await redisClient.connect();
})();

const socketServer = new WebSocketServer({ server: httpServer });

socketServer.on("connection", (wss) => {
  console.log("socket running");

  console.log("New WebSocket connection");
  let currentRoom = null;

  wss.on("message", (value) => {
    const message = JSON.parse(value.toString());

    if (message.type === JOIN_ROOM) {
      wss.send(
        JSON.stringify({
          message: "Room joined",
        })
      );
    }
    if (message.type === CHAT) {
      console.log(message);
      wss.send(
        JSON.stringify({
          message: "Chat published",
        })
      );
    }
  });

  wss.on("close", () => {
    if (currentRoom) {
      console.log(`Client left room: ${currentRoom}`);
      subscriber.unsubscribe(currentRoom);
    }
  });
});
