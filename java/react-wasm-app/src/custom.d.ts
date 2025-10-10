declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

interface Window {
  TeaVM: {
    wasm: {
      // A função 'load' recebe o caminho para o arquivo .wasm e retorna uma Promessa
      load: (path: string) => Promise<any>;
    }
  };
}