import type { LanguageConfig } from "@/models/language";
import { registerLanguage } from "@/lib/languageRegistry";
import { PythonRuntime } from "@/runtimes/python";
import { CRuntime } from "@/runtimes/c";
import { JavaRuntime, JavaScriptRuntime } from "@/runtimes/java";
import { Coffee, Cpu, FileCode2 } from "lucide-react";

const pythonConfig: LanguageConfig = {
  id: "python",
  name: "Python",
  icon: FileCode2,
  fileExtension: ".py",
  defaultCode: "print('Olá, mundo!')",
  getCodemirrorExtension: async () => {
    const { python } = await import("@codemirror/lang-python");
    return python();
  },
  createRuntime: () => new PythonRuntime(),
};

const cConfig: LanguageConfig = {
  id: "c",
  name: "C",
  icon: Cpu,
  fileExtension: ".c",
  defaultCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  getCodemirrorExtension: async () => {
    const { cpp } = await import("@codemirror/lang-cpp");
    return cpp();
  },
  createRuntime: () => new CRuntime(),
};

const javaConfig: LanguageConfig = {
  id: "java",
  name: "Java",
  icon: Coffee,
  fileExtension: ".java",
  defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Olá do Java com CheerpJ!");
    }
}`,
  getCodemirrorExtension: async () => {
    const { java } = await import("@codemirror/lang-java");
    return java();
  },
  createRuntime: () => new JavaRuntime(),
};

export function initializeLanguages(): void {
  registerLanguage(pythonConfig);
  registerLanguage(cConfig);
  registerLanguage(javaConfig);
}
