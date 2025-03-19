import { useState, useEffect } from "react";

export const useCodeExecutor = () => {
    const [worker, setWorker] = useState<Worker | null>(null);
    const [output, setOutput] = useState<string>("");
    const [logs, setLogs] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Initialize Web Worker
        const newWorker = new Worker(new URL("../workers/codeExecutor.ts", import.meta.url), { type: "module" });

        newWorker.onmessage = (event) => {
            const { result, logs, error } = event.data;
            if (error) setError(error);
            else {
                setOutput(result !== undefined ? String(result) : "No Output");
                setLogs(logs);
            }
        };

        setWorker(newWorker);

        return () => newWorker.terminate();
    }, []);

    const executeCode = (code: string) => {
        if (worker) {
            setOutput("");
            setLogs([]);
            setError(null);
            worker.postMessage({ code });
        }
    };

    return { executeCode, output, logs, error };
};
