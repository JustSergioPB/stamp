import { LoaderCircle } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <LoaderCircle className="h-16 w-16 text-blue-600 animate-spin" />
    </div>
  );
}
