import type { JSONSchema7 } from 'json-schema';
import { JsonSchemaViewer } from './json-schema-viewer';
import type { PropertyRestrictions, CodeProperties } from './json-schema-viewer-element';

export interface JsonSchemaViewerPanelProps {
  schema: JSONSchema7;
  selectedAllOf?: PropertyRestrictions;
  selectedAnyOf?: PropertyRestrictions;
  selectedOneOf?: PropertyRestrictions;
  propertyRestrictions?: string[];
  slug: string;
  codeblock?: Record<string, unknown>;
  setCodeblock: React.Dispatch<React.SetStateAction<Record<string, unknown> | undefined>>;
  parentProperties: CodeProperties[];
}

export function JsonSchemaViewerPanel(props: JsonSchemaViewerPanelProps): JSX.Element | null {
  const { schema, ...rest } = props;

  if (schema.type === 'object') {
    return (
      <div className="ml-2 space-y-2 border-l border-white hover:border-slate-200 dark:border-slate-900 dark:hover:border-slate-800">
        <JsonSchemaViewer schema={schema} {...rest} className="pl-4" />
      </div>
    );
  }

  if (
    schema.type === 'array' &&
    // Array should only contain one type of an object
    !Array.isArray(schema.items) &&
    schema.items &&
    typeof schema.items !== 'boolean'
  ) {
    return (
      <div className="ml-2 space-y-2 border-l border-white hover:border-slate-200 dark:border-slate-900 dark:hover:border-slate-800">
        <JsonSchemaViewer schema={schema.items} {...rest} className="pl-4" />
      </div>
    );
  }

  return null;
}

export default JsonSchemaViewerPanel;
