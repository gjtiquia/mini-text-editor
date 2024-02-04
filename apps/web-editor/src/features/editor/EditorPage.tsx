import { useAtom } from "jotai"
import { appStateAtom } from "../../lib/atoms"
import { trpc } from "../../lib/trpc";
import { useEffect, useState } from "react";
import { BackButton } from "./BackButton";
import { EditorView } from "./EditorView";
import { GenericTextButton } from "../../ui/GenericTextButton";

export function EditorPage() {

    const [appState, setAppState] = useAtom(appStateAtom);

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
                    <BackButton onClick={() => setAppState({ isInExplorerMode: true, activeFilePath: "" })} />
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

            <div className="flex-grow">
                {readFileQuery.isPending && <p>Loading...</p>}
                {readFileQuery.isSuccess &&
                    <EditorView text={text} setText={(x) => setText(x)} />
                }
            </div>
        </div>
    )
}

