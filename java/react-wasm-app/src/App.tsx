import React, { useState, useEffect } from "react";

function App() {
  const [wasmCalculator, setWasmCalculator] = useState<Function | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    // Verificamos se o objeto TeaVM e sua função 'load' existem
    if (window.TeaVM && window.TeaVM.wasm) {
      // Chamamos ativamente a função load, passando o caminho para o arquivo .wasm
      // Este caminho é relativo à pasta 'public'
      window.TeaVM.wasm
      .load("/classes.wasm")
      .then((module) => {
          // No seu WasmEntry.java, a função se chama 'soma'
          setWasmCalculator(() => module.instance.exports.soma);
        })
        .catch((error) => {
          console.error("Erro ao carregar o módulo WebAssembly:", error);
          setResult("Falha ao carregar o módulo Wasm.");
        });
    }
  }, []); // Executa apenas uma vez, quando o componente é montado.

 const handleCalculate = () => {
  if (wasmCalculator) {
    const num1 = 85;
    const num2 = 85;
    // A função foi exportada como 'soma', então a usamos aqui
    const sum = wasmCalculator(num1, num2);
    setResult(`O resultado de ${num1} + ${num2} (calculado com Java/Wasm) é: ${sum}`);
  } else {
    setResult('Módulo Wasm ainda não foi carregado.');
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>React com Java + WebAssembly (TeaVM)</h1>
      <button onClick={handleCalculate} disabled={!wasmCalculator}>
        Calcular Soma com Wasm
      </button>
      {wasmCalculator ? (
        <p style={{ color: "green" }}>Módulo Wasm carregado com sucesso!</p>
      ) : (
        <p style={{ color: "orange" }}>Carregando módulo Wasm...</p>
      )}
      {result && <h2>{result}</h2>}
    </div>
  );
}

export default App;
