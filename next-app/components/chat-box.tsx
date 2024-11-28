"use client";
import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";

export default function ChatBox({ messages }: { messages: string[] }) {
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const chatBoxRef = useRef(null);
  const [chat, setChat] = useState("");

  useEffect(() => {
    setAllMessages(messages);
  }, []);

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [setAllMessages, allMessages]);

  const onSend = () => {
    if (chat === "") return;

    setAllMessages((prev) => [...prev, chat]);
  };

  return (
    <Card className="w-full  bg-secondary/50 rounded-md relative pb-5">
      <div className="w-full h-[28rem]  px-5 my-4 ">
        <ul
          className=" flex flex-col h-full overflow-y-scroll gap-4 pr-8 scrollable-container"
          ref={chatBoxRef}
        >
          {allMessages.map((message, key) => (
            <li
              key={key}
              className={`px-4 py-2  w-fit max-w-72 rounded-md ${
                key % 2 === 0
                  ? "bg-secondary self-start"
                  : "bg-primary self-end"
              }`}
            >
              {message}
            </li>
          ))}
        </ul>
      </div>

      <div className=" px-5 pb-4 relative">
        <Button
          onClick={onSend}
          className="absolute bottom-7 right-7"
          size={"icon"}
        >
          <Send />
        </Button>
        <Textarea
          onChange={(e) => {
            setChat(e.target.value);
          }}
          className="ring-1 ring-primary"
          maxLength={1000}
          rows={3}
        />
      </div>
    </Card>
  );
}
