import { DICTIONARIES } from "@i18n/constants/dictionaries.const";
import { Translatable } from "@i18n/types/translatable";
import { Clock2, Mail, RotateCcw } from "lucide-react";

type Props = Translatable;

export default function ErrorScreen({ lang }: Props) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-start gap-1 text-center">
        <h1 className="text-xl font-bold mb-1">
          {DICTIONARIES[lang]?.errorScreen.title}
        </h1>
        <h2 className="text-lg text-neutral-500 mb-5">
          {DICTIONARIES[lang]?.errorScreen.subtitle}
        </h2>
        <ul>
          <li className="text-neutral-500 flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            {DICTIONARIES[lang]?.errorScreen.options.refresh}
          </li>
          <li className="text-neutral-500 flex items-center gap-2 my-2">
            <Clock2 className="h-4 w-4" name="clock2" />
            {DICTIONARIES[lang]?.errorScreen.options.tryAgain}
          </li>
          <li className="text-neutral-500 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {DICTIONARIES[lang]?.errorScreen.options.sendEmail}
          </li>
        </ul>
      </div>
    </div>
  );
}
