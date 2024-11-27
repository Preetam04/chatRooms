"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function generateRandomString(length = 8): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default function CodeGeneratorCard() {
  const [code, setCode] = useState("");

  const { toast } = useToast();

  function copyToClipboard(code: string) {
    const roomLink = new URL(`/${code}`, window.location.origin);

    navigator.clipboard.writeText(roomLink.href).then((ele) => {
      toast({
        title: "Link copied to clipboard",
        variant: "default",
      });
    });
  }

  return (
    <div className="mt-5  rounded-md px-5 py-4 w-full  max-w-sm bg-secondary">
      <h4 className="text-center  font-normal text-foreground/75 text-lg">
        Generate a Room ID
      </h4>
      <div className="flex flex-col mt-4 items-center w-full ">
        {code.length === 0 && (
          <Button
            onClick={() => {
              setCode(generateRandomString());
            }}
          >
            Generate
          </Button>
        )}
        {code.length !== 0 && (
          <div className="flex gap-4 items-center">
            <h5 className="text-lg font-medium items-center bg-primary/5 px-3 py-1 rounded-md">
              &#x201c;{code}&#x201d;
            </h5>

            <Button
              variant={"link"}
              size={"sm"}
              className="ring-1 ring-primary"
              onClick={() => {
                copyToClipboard(code);
              }}
            >
              <Copy size={12} className="text-foreground/45 " />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
