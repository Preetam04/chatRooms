"use client";
import ErrorComp from "@/components/error-comp";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SOCKET_URL } from "@/lib/constants";
import { ArrowLeft, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type messageType = {
  message: string;
  uuid: string;
};

export default function ChatRoom() {
  const chatBoxRef = useRef(null);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState<messageType[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { roomId } = useParams();
  const [localUserId, setLocalUserId] = useState("");
  const [error, setError] = useState<boolean>(false);

  const navigate = useRouter();

  useEffect(() => {
    const newSocket = new WebSocket(SOCKET_URL);
    setSocket(newSocket);

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
      if (data.type === "error") {
        // navigate.push("/error/" + roomId);
        setError(true);
      }

      console.log(data);
      const recievedMessage = JSON.parse(data.message);
      setAllMessages((prev) => [...prev, recievedMessage]);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [setAllMessages, allMessages]);

  const onSend = (msg: string) => {
    if (msg === "") return;
    // setAllMessages((prev) => [...prev, msg]);
    const uuid = localStorage.getItem("chat-room-uuid");
    if (socket) {
      socket.send(
        JSON.stringify({
          type: "chat",
          payload: {
            roomId: roomId,
            chat: msg,
            uuid,
          },
        })
      );
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("chat-room-uuid");
    if (!id) {
      const newId = uuidv4();
      localStorage.setItem("chat-room-uuid", newId);
      setLocalUserId(newId);
    } else {
      setLocalUserId(id);
    }
  }, []);

  return error ? (
    <ErrorComp errId={roomId} />
  ) : (
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
                  className={`px-4 py-2  w-fit max-w-72 rounded-md break-words ${
                    ele.uuid !== localUserId
                      ? "bg-secondary self-start"
                      : "bg-primary self-end"
                  }`}
                >
                  {ele.message}
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
