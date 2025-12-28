interface Window {
  cheerpjInit: (options?: any) => Promise<void>;
  cheerpjRunMain: (className: string, ...args: string[]) => Promise<number>;
  cheerpOSAddStringFile: (path: string, content: string) => void;
}
