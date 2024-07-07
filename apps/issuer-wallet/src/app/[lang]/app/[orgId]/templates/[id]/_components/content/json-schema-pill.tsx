import { JsonSchema, ObjectJsonSchema } from "@stamp/domain";
import { iconMap } from "./icon.map";
import TreeAngle from "@components/stamp/tree-angle";
import { cn } from "@lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  schema: JsonSchema;
}

export default function JsonSchemaPill({ schema, className }: Props) {
  return (
    <div className={className}>
      <div className="inline-flex items-center bg-muted rounded-xl py-2 px-3">
        {iconMap[schema.type]}
        <p className="text-sm">{schema.title}</p>
      </div>
      {schema.type === "object" && (
        <ObjectJsonSchemaPill
          className="ml-4"
          schema={schema as ObjectJsonSchema}
        />
      )}
    </div>
  );
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  schema: ObjectJsonSchema;
  isFirst?: boolean;
}

export function ObjectJsonSchemaPill({
  schema,
  className,
  isFirst,
}: ItemProps) {
  if (!schema.properties) {
    return <></>;
  }

  const keys = Object.keys(schema.properties);
  const lastKey = keys[keys.length - 1];

  return (
    <div className={cn("grow shrink-0 basis-auto", className)}>
      <div className="flex">
        <span className="border-l-2 border-l-neutral-300 inline-block"></span>
        <ul className="w-full space-y-2">
          {keys.map(
            (key, index) =>
              schema.properties?.[key] &&
              index !== keys.length - 1 && (
                <li key={key} className="flex items-start first:mt-2">
                  <span className="border-b-2 border-b-neutral-300 w-4 inline-block mt-5"></span>
                  <JsonSchemaPill
                    className="grow shrink-0 basis-auto"
                    key={key}
                    schema={schema.properties[key]}
                  />
                </li>
              )
          )}
        </ul>
      </div>
      {!isFirst
        ? lastKey &&
          schema.properties?.[lastKey] && (
            <TreeAngle>
              <JsonSchemaPill schema={schema.properties[lastKey]} />
            </TreeAngle>
          )
        : lastKey &&
          schema.properties?.[lastKey] && (
            <JsonSchemaPill schema={schema.properties[lastKey]} />
          )}
    </div>
  );
}
