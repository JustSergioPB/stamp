import { Clock2, Mail, RotateCcw } from "lucide-react";

export default function ErrorScreen() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-start gap-1 text-center">
        <h1 className="text-xl font-bold mb-1">
          Oops! Something broke while searching
        </h1>
        <h2 className="text-lg text-neutral-500 mb-5">
          We're working on fixing it, in the meantime you can:
        </h2>
        <ul>
          <li className="text-neutral-500 flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Refresh the page (it sometimes works)
          </li>
          <li className="text-neutral-500 flex items-center gap-2 my-2">
            <Clock2 className="h-4 w-4" name="clock2" />
            Try again in 10 minutes
          </li>
          <li className="text-neutral-500 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Send us an email explaining what happened
          </li>
        </ul>
      </div>
    </div>
  );
}
