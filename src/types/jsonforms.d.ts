declare module '@jsonforms/react' {
  export interface JsonFormsProps {
    schema?: Record<string, unknown>;
    uischema?: Record<string, unknown>;
    data: Record<string, unknown>;
    renderers?: Array<Record<string, unknown>>;
    cells?: Array<Record<string, unknown>>;
    onChange?: (state: { data: Record<string, unknown> }) => void;
  }
} 