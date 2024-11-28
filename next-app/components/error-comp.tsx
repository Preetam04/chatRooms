import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const ErrorComp = ({ errId }: { errId: string }) => {
  return (
    <div className=" flex flex-col items-center justify-center mt-44">
      <div className=" flex flex-col items-center space-y-4">
        <h3 className="text-xl ">
          ChatRoom for Id{" "}
          <span className="font-semibold text-primary">{errId}</span>{" "}
          didn&apos;t exists
        </h3>
        <Link href={"/"}>
          <Button>
            <ArrowLeft />
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorComp;
