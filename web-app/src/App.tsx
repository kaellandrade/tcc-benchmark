// src/App.tsx
import React from "react";
import PythonEditor from "./components/PythonEditor";

const App: React.FC = () => {
  return (
    <div className="w-[100vw] min-h-[100vh] p-4 flex flex-col">
      <PythonEditor />
    </div>
  );
};

export default App;
