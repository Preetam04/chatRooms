import express, { Request, Response } from "express";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(express.json());

dotenv.config({ path: "./.env" });
app.use(cors({ origin: process.env.CORS_ORIGIN }));

const httpServer = app.listen(process.env.PORT, () => {
  console.log("server started");
});

app.get("/api/create/:id", (req, res) => {
  const { id } = req.params;
  //   TODO: Create the chat ROOM

  res.status(200).json("Chat Room created");
  return;
});

const socketServer = new WebSocketServer({ server: httpServer });

socketServer.on("connection", (wss) => {
  console.log("socket running");
});
