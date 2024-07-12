import {
  ArrayJsonSchemaZod,
  JsonSchemaZod,
  ObjectJsonSchemaZod,
} from "@features/credentials/json-schema/models";
import { iconMap } from "./icon.map";
import TreeAngle from "@components/stamp/tree-angle";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  jsonSchemaZod: JsonSchemaZod;
  isLast?: boolean;
}

//TODO: Add dialog to check config details

export default function JsonSchemaPill({
  jsonSchemaZod,
  className,
  isLast,
}: Props) {
  let children;

  if (jsonSchemaZod.type === "object") {
    children = jsonSchemaZod as ObjectJsonSchemaZod;
  }

  if (jsonSchemaZod.type === "array") {
    const arrayJsonSchema = jsonSchemaZod as ArrayJsonSchemaZod;

    if (
      arrayJsonSchema.items &&
      !Array.isArray(arrayJsonSchema.items) &&
      arrayJsonSchema.items.type === "object"
    ) {
      children = arrayJsonSchema.items as ObjectJsonSchemaZod;
    }
  }

  function renderPill() {
    return (
      <div className="inline-flex items-center bg-muted rounded-xl py-2 px-3">
        {iconMap[jsonSchemaZod.type]}
        <p className="text-sm">{jsonSchemaZod.title}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {isLast ? <TreeAngle>{renderPill()}</TreeAngle> : renderPill()}
      {children && (
        <ObjectJsonSchemaPill
          className={isLast ? "ml-8" : "ml-4"}
          jsonSchemaZod={children}
        />
      )}
    </div>
  );
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  jsonSchemaZod: ObjectJsonSchemaZod;
}

export function ObjectJsonSchemaPill({ jsonSchemaZod, className }: ItemProps) {
  if (!jsonSchemaZod.properties) {
    return <></>;
  }

  const lastKey = jsonSchemaZod.properties.pop();

  return (
    <div className={className}>
      <div className="flex">
        <span className="border-l-2 border-l-neutral-300 inline-block"></span>
        <ul className="w-full space-y-2 mb-2">
          {jsonSchemaZod.properties.map((prop, index) => (
            <li
              key={`${prop.title}.${index}`}
              className="flex items-start first:mt-2"
            >
              <span className="border-b-2 border-b-neutral-300 w-4 inline-block mt-5"></span>
              <JsonSchemaPill jsonSchemaZod={prop} />
            </li>
          ))}
        </ul>
      </div>
      {lastKey && <JsonSchemaPill jsonSchemaZod={lastKey} isLast />}
    </div>
  );
}
