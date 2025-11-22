// types.ts
export interface TabConfig {
  id: string;
  label: string;
  component: React.ComponentType<any>;
}

export interface ColumnConfig {
  name: string;
  label: string;
}

export interface TableConfig {
  columns: ColumnConfig[];
  fetchUrl: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type:
  | "text"
  | "email"
  | "password"
  | "number"
  | "select"
  | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: any }[];
  fetchOptions?: () => Promise<any[]>;
}


export interface FormConfig<T = any> {
  defaultValues: T;
  fields: FieldConfig[];
   submitApi: (payload: T) => Promise<any>; 
}

export interface ModuleConfig<T = any> {
  tabs: TabConfig[];
  table: TableConfig;
  form: FormConfig<T>;
}

export interface TabsProps<T = any> {
  tabs: TabConfig[];
  moduleConfig: ModuleConfig<T>;
}

export interface CommonFormProps<T = any> {
  form: FormConfig<T>;
}

export interface CommonTableProps {
  table: TableConfig;
}