import { useAtom } from "jotai"
import { appStateAtom } from "../../lib/atoms"
import { trpc } from "../../lib/trpc";
import { useEffect, useState } from "react";

export function EditorPage() {

    const [appState, setAppState] = useAtom(appStateAtom);
    const readFileQuery = trpc.readFile.useQuery({ path: appState.activeFilePath });

    const [text, setText] = useState("");
    useEffect(() => {
        if (!readFileQuery.data)
            return;

        setText(readFileQuery.data?.text)
    }, [readFileQuery.data])

    return (
        <div className="h-dvh flex flex-col gap-4 p-2">
            <h1 className="font-bold text-center">
                Mini Text Editor: Explorer
            </h1>

            <div>
                <button
                    className="
                        block underline
                        text-blue-500 hover:text-blue-600 active:text-blue-700
                    "
                    onClick={() => setAppState({ isInExplorerMode: true, activeFilePath: "" })}
                >
                    Back To Explorer
                </button>
            </div>

            <div className="flex-grow">
                {readFileQuery.isPending && <p>Loading...</p>}
                {readFileQuery.isSuccess &&
                    <textarea
                        className="
                            h-full w-full px-2 
                            bg-transparent rounded-md border border-black
                            font-mono whitespace-pre
                        "
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                }
            </div>

        </div>
    )
}