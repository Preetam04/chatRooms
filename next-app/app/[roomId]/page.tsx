"use client";
import ChatBox from "@/components/chat-box";
import { ChartBarIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

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
  const { roomId } = useParams();

  console.log(roomId);

  return (
    <div className="container  flex h-screen items-center flex-col jus pt-28 ">
      <div className="w-full max-w-xl h-3/5">
        <h1 className="font-bold text-4xl text-left ">
          Chat<span className="text-primary">Rooms</span>
        </h1>
        <h3 className="text-foreground/50 text-left mb-2">
          Room Id: <span className="text-foreground">{roomId}</span>
        </h3>
        <ChatBox messages={conversation.map((ele) => ele.content)} />
      </div>
    </div>
  );
}
