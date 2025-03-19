import React from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
    code: string;
    setCode: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
    return (
        <div className="w-full h-[400px] border rounded-lg shadow-lg">
            <MonacoEditor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
