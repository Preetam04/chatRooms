import CodeGeneratorCard from "@/components/code-generator-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center container pt-52">
      <div className="">
        <h1 className="font-bold text-6xl text-center ">
          Welcome to Chat<span className="text-primary">Rooms</span>
        </h1>
        <p className="text-center text-xl mt-4 text-foreground/55 capitalize">
          Create a room and share it with your friends to get started
        </p>
      </div>
      <CodeGeneratorCard />
    </div>
  );
}
