import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function ChatBox({ messages }: { messages: string[] }) {
  return (
    <div className="w-full  bg-secondary/50 rounded-md relative pb-5">
      <div className="w-full h-[25rem]  px-5 pt-4 ">
        <ul className=" flex flex-col h-full overflow-y-scroll gap-4 pr-8 scrollable-container">
          {messages.map((message, key) => (
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

      <div className=" px-5 py-4 relative">
        <Button className="absolute bottom-7 right-7" size={"icon"}>
          <Send />
        </Button>
        <Textarea className="ring-1 ring-primary" maxLength={1000} rows={4} />
      </div>
    </div>
  );
}
