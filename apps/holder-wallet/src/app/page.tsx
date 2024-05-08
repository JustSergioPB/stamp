import { Button } from "@components/ui/button";
import { connectToMongo } from "@stamp/database";

export default function Home() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  connectToMongo(process.env.MONGODB_URI);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Hello</Button>
    </main>
  );
}
