/* Web Worker for executing JavaScript safely */
self.onmessage = (event) => {
    const { code } = event.data;
    let result = "";

    try {
        // Capture console.log output
        const logs: string[] = [];
        const originalConsoleLog = console.log;
        console.log = (...args) => {
            logs.push(args.join(" "));
            originalConsoleLog(...args);
        };

        // Execute the code
        result = eval(code);

        // Restore console.log
        console.log = originalConsoleLog;

        // Send back the output & logs
        self.postMessage({ result, logs });
    } catch (error: any) {
        self.postMessage({ error: error.toString() });
    }
};
