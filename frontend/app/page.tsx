import Image from "next/image";
import Header from "@/src/components/header";
import SnippetsList from "@/src/components/snippetsList";

export default function Home() {
  return (
    <div className="h-screen bg-blue-100 flex flex-col items-center">
      <Header />
      
      <SnippetsList />
    </div>
  );
}
