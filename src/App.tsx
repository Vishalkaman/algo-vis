import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import { useCodeExecutor } from "./hooks/useCodeExecutor";

function App() {
  const [code, setCode] = useState(`console.log("Hello, world!");`);
  const { executeCode, output, logs, error } = useCodeExecutor();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Algorithm Visualizer</h1>
      <CodeEditor code={code} setCode={setCode} />
      
      <button
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
        onClick={() => executeCode(code)}
      >
        Run Code
      </button>

      <div className="mt-4 w-full max-w-lg bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-bold">Output:</h2>
        <p className="text-green-400">{output}</p>

        <h2 className="text-lg font-bold mt-2">Console Logs:</h2>
        {logs.length > 0 ? logs.map((log, i) => <p key={i} className="text-yellow-400">{log}</p>) : <p>No logs</p>}

        {error && (
          <div className="mt-2 text-red-500">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
