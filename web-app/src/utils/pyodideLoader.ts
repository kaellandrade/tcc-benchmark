export async function loadPyodideInstance(): Promise<any> {
  if (!(window as any).loadPyodide) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
    script.async = true;

    await new Promise<void>((resolve) => {
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  const pyodide = await (window as any).loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
  });

  return pyodide;
}
