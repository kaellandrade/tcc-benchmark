declare module "JSCPP" {
  interface JSCPPConfig {
    stdio?: {
      write?: (content: string) => void;
      drain?: () => string | null;
    };
    unsigned_overflow?: "error" | "warn" | "ignore";
    maxTimeout?: number;
    debug?: boolean;
  }

  function run(code: string, input?: string, config?: JSCPPConfig): number;

  const JSCPP: {
    run: typeof run;
    includes: Record<string, unknown>;
  };

  export default JSCPP;
}
