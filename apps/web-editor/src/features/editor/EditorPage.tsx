import { useAtom } from "jotai"
import { appStateAtom } from "../../lib/atoms"
import { trpc } from "../../lib/trpc";
import { GenericTextButton } from "../../ui/GenericTextButton";
import { useEffect, useRef, useState } from "react";
import { CodeInput } from "./CodeInput";

import Prism from 'prismjs';
import('prismjs/components/prism-markdown')
// import "./themes/prism.css"
// import "./themes/prism-vsc-dark-plus.css"
import "./themes/prism-atom-dark.css"

export function EditorPage() {

    const [appState, setAppState] = useAtom(appStateAtom);

    const containerRef = useRef<HTMLDivElement>(null);

    const utils = trpc.useUtils();
    const readFileQuery = trpc.readFile.useQuery({ path: appState.activeFilePath });
    const overwriteFileMutation = trpc.overwriteFile.useMutation({
        onSuccess: () => utils.readFile.invalidate()
    });

    const [originalText, setOriginalText] = useState("")
    const [text, setText] = useState("");

    useEffect(() => {
        if (!readFileQuery.data)
            return;

        const text = readFileQuery.data.text;

        setOriginalText(text);
        setText(text);

    }, [readFileQuery.data])

    function isTextDirty() {
        return originalText !== text;
    }

    return (
        <div className="h-dvh flex flex-col gap-4 p-2">
            <h1 className="font-bold text-center">
                Mini Text Editor: Explorer
            </h1>

            <div className="flex justify-between">
                <div>
                    <GenericTextButton text="Back To Explorer" onClick={() => setAppState({ isInExplorerMode: true, activeFilePath: "" })} />
                </div>

                <div className="flex gap-2">
                    {isTextDirty() &&
                        <GenericTextButton text="Reset" onClick={() => setText(originalText)} />
                    }

                    {isTextDirty() &&
                        <GenericTextButton text="Save" onClick={() => overwriteFileMutation.mutate({ path: appState.activeFilePath, text: text })} />
                    }
                </div>
            </div>

            <div className="h-[80vh] w-[85vw] bg-blue-500" ref={containerRef}>
                {readFileQuery.isPending && <p>Loading...</p>}
                {readFileQuery.isSuccess &&
                    <CodeInput
                        autoHeight
                        resize="none"
                        // placeholder="Input your code here..."
                        prismJS={Prism}
                        onChange={setText}
                        value={text}
                        language={'markdown'}

                        containerRef={containerRef}
                    />
                }
            </div>
        </div>
    )
}

