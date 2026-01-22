import type { Extension } from "@uiw/react-codemirror";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export type OutputCallback = (text: string) => void;

export interface ExecuteOptions {
  onOutput?: OutputCallback;
}

export interface LanguageRuntime {
  initialize(): Promise<void>;
  execute(code: string, options?: ExecuteOptions): Promise<ExecutionResult>;
  isReady(): boolean;
}

export interface LanguageConfig {
  id: string;
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  fileExtension: string;
  defaultCode: string;
  getCodemirrorExtension: () => Promise<Extension>;
  createRuntime: () => LanguageRuntime;
}

export interface FileTab {
  id: string;
  name: string;
  content: string;
}
