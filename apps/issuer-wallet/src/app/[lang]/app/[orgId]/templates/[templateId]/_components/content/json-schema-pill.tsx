import { ArrayJsonSchema, JsonSchema, ObjectJsonSchema } from "@stamp/domain";
import { iconMap } from "./icon.map";
import TreeAngle from "@components/stamp/tree-angle";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  jsonSchema: JsonSchema;
  isLast?: boolean;
}

export default function JsonSchemaPill({
  jsonSchema,
  className,
  isLast,
}: Props) {
  let children;

  if (jsonSchema.type === "object") {
    children = jsonSchema as ObjectJsonSchema;
  }

  if (jsonSchema.type === "array") {
    const arrayJsonSchema = jsonSchema as ArrayJsonSchema;

    if (
      arrayJsonSchema.items &&
      !Array.isArray(arrayJsonSchema.items) &&
      arrayJsonSchema.items.type === "object"
    ) {
      children = arrayJsonSchema.items as ObjectJsonSchema;
    }
  }

  function renderPill() {
    return (
      <div className="inline-flex items-center bg-muted rounded-xl py-2 px-3">
        {iconMap[jsonSchema.type]}
        <p className="text-sm">{jsonSchema.title}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {isLast ? <TreeAngle>{renderPill()}</TreeAngle> : renderPill()}
      {children && (
        <ObjectJsonSchemaPill
          className={isLast ? "ml-8" : "ml-4"}
          jsonSchema={children}
        />
      )}
    </div>
  );
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  jsonSchema: ObjectJsonSchema;
}

export function ObjectJsonSchemaPill({ jsonSchema, className }: ItemProps) {
  if (!jsonSchema.properties) {
    return <></>;
  }

  const keys = Object.keys(jsonSchema.properties);
  const lastKey = keys.pop();

  function renderListItem(key: string) {
    if (!jsonSchema.properties || !jsonSchema.properties[key]) return <></>;

    return (
      <li key={key} className="flex items-start first:mt-2">
        <span className="border-b-2 border-b-neutral-300 w-4 inline-block mt-5"></span>
        <JsonSchemaPill key={key} jsonSchema={jsonSchema.properties[key]} />
      </li>
    );
  }

  function renderLast() {
    if (!lastKey || !jsonSchema.properties?.[lastKey]) return <></>;

    return (
      <JsonSchemaPill jsonSchema={jsonSchema.properties[lastKey]} isLast />
    );
  }

  return (
    <div className={className}>
      <div className="flex">
        <span className="border-l-2 border-l-neutral-300 inline-block"></span>
        <ul className="w-full space-y-2 mb-2">
          {keys.map((key) => renderListItem(key))}
        </ul>
      </div>
      {renderLast()}
    </div>
  );
}
