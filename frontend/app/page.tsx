import Header from "@/src/components/header";
import SnippetsList from "@/src/components/snippetsList";

export default function Home() {
  return (
    <div className="min-h-screen h-full bg-blue-50 flex flex-col items-center">
      <Header />
      
      <SnippetsList />
    </div>
  );
}
