"use client";
import ChatBox from "@/components/chat-box";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SOCKET_URL } from "@/lib/constants";
import { ChartBarIcon, Send } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const conversation = [
  {
    id: 1,
    sender: "Alice",
    content: "Hey, how are you?",
    timestamp: "2024-11-22T09:00:00Z",
  },
  {
    id: 2,
    sender: "Bob",
    content: "I'm good, thanks! How about you?",
    timestamp: "2024-11-22T09:01:00Z",
  },
  {
    id: 3,
    sender: "Alice",
    content: "Doing well, just been busy with work.",
    timestamp: "2024-11-22T09:02:00Z",
  },
  {
    id: 4,
    sender: "Bob",
    content: "I know the feeling. What kind of work are you doing?",
    timestamp: "2024-11-22T09:03:00Z",
  },
  {
    id: 5,
    sender: "Alice",
    content: "Mostly frontend development. You?",
    timestamp: "2024-11-22T09:04:00Z",
  },
  {
    id: 6,
    sender: "Bob",
    content: "Same here! I've been working on a React project recently.",
    timestamp: "2024-11-22T09:05:00Z",
  },
  {
    id: 7,
    sender: "Alice",
    content: "That's awesome! React is so versatile.",
    timestamp: "2024-11-22T09:06:00Z",
  },
  {
    id: 8,
    sender: "Bob",
    content: "Definitely. We should collaborate on something sometime!",
    timestamp: "2024-11-22T09:07:00Z",
  },
  {
    id: 9,
    sender: "Alice",
    content: "For sure! Let’s set something up soon.",
    timestamp: "2024-11-22T09:08:00Z",
  },
];

export default function ChatRoom() {
  const chatBoxRef = useRef(null);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { roomId } = useParams();

  useEffect(() => {
    const newSocket = new WebSocket(SOCKET_URL);
    setSocket(newSocket);

    console.log(newSocket);

    newSocket.onopen = () => {
      console.log("connection established");
      newSocket.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomId,
          },
        })
      );
    };

    newSocket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      // console.log(data);
      if (data.type === "message") {
        setAllMessages((prev) => [...prev, data.message]);
      }
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const onSend = (msg: string) => {
    if (msg === "") return;
    // setAllMessages((prev) => [...prev, msg]);

    if (socket) {
      socket.send(
        JSON.stringify({
          type: "chat",
          payload: {
            roomId: roomId,
            chat: msg,
          },
        })
      );
    }
  };

  return (
    <div className="container  flex h-screen items-center flex-col jus pt-28 ">
      <div className="w-full max-w-xl h-3/5">
        <h1 className="font-bold text-4xl text-left ">
          Chat<span className="text-primary">Rooms</span>
        </h1>
        <h3 className="text-foreground/50 text-left mb-2">
          Room Id: <span className="text-foreground">{roomId}</span>
        </h3>
        {/* <ChatBox messages={conversation.map((ele) => ele.content)} /> */}
        <Card className="w-full  bg-secondary/50 rounded-md relative pb-5">
          <div className="w-full h-[28rem]  px-5 my-4 ">
            <ul
              className=" flex flex-col h-full overflow-y-scroll gap-4 pr-8 scrollable-container"
              ref={chatBoxRef}
            >
              {allMessages.map((ele, key) => (
                <li
                  key={key}
                  className={`px-4 py-2  w-fit max-w-72 rounded-md ${
                    key % 2 === 0
                      ? "bg-secondary self-start"
                      : "bg-primary self-end"
                  }`}
                >
                  {ele}
                </li>
              ))}
            </ul>
          </div>

          <div className=" px-5 pb-4 relative">
            <Button
              onClick={() => {
                onSend(message);
                setMessage("");
              }}
              className="absolute bottom-7 right-7"
              size={"icon"}
            >
              <Send />
            </Button>
            <Textarea
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              className="ring-1 ring-primary"
              maxLength={1000}
              rows={3}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
