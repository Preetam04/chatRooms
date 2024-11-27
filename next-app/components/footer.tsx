import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-secondary/20 text-sm w-full py-6 px-10 text-foreground/75">
      Developed by{" "}
      <Link
        href={"https://github.com/Preetam04"}
        className="underline text-foreground"
      >
        Preetam Patil
      </Link>
    </div>
  );
}
