"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardTitle } from "./ui/card";
import axios from "axios";
import { SERVER_BASE_URL } from "@/lib/constants";

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

  const addRoom = async (roomId: string) => {
    try {
      await axios.get(`${SERVER_BASE_URL}/add-rooms/${roomId}`);
      // console.log(res);
      toast({
        title: `Room ${code} created!`,
        variant: "default",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code !== "") {
      addRoom(code);
    }
  }, [code]);

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
    <Card className="mt-8  rounded-md px-5 py-4 w-full  max-w-sm bg-secondary/20 space-y-4 flex items-center flex-col">
      <CardTitle className="text-xl text-center">Generate a Room ID</CardTitle>
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
            className=" text-foreground/45 hover:text-primary"
            onClick={() => {
              copyToClipboard(code);
            }}
          >
            <Copy size={12} className=" " />
          </Button>
        </div>
      )}
    </Card>
  );
}
