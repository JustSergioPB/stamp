import { Button } from "@components/ui/button";
import { connectToDatabase } from "@stamp/database";

export default function Home() {
  connectToDatabase();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Hello</Button>
    </main>
  );
}
