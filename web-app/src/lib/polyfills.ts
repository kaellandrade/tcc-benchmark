// Polyfill for crypto.randomUUID for non-secure contexts (like HTTP) or older browsers.
if (typeof crypto.randomUUID !== 'function') {
  (crypto as any).randomUUID = function randomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
}
