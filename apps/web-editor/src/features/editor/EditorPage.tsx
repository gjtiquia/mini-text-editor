import { useEffect, useState } from "react";
import { useAtom } from "jotai"
import { appStateAtom } from "../../lib/atoms"
import { trpc } from "../../lib/trpc";
import { GenericTextButton } from "../../ui/GenericTextButton";
import { EditorView } from "./EditorView";

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
        <div className="h-dvh flex flex-col gap-2 p-2">

            <div className="flex justify-between">
                <div>
                    <GenericTextButton text="Back" onClick={() => setAppState({ isInExplorerMode: true, activeFilePath: "" })} />
                </div>

                <div className="flex gap-2">
                    <GenericTextButton text="Reset" isDisabled={!isTextDirty()} onClick={() => setText(originalText)} />
                    <GenericTextButton text="Save" isDisabled={!isTextDirty()} onClick={() => overwriteFileMutation.mutate({ path: appState.activeFilePath, text: text })} />
                </div>
            </div>

            <div className="flex-grow min-h-0 flex flex-col">
                {readFileQuery.isPending && <p>Loading...</p>}
                {readFileQuery.isSuccess &&
                    <EditorView text={text} setText={(x) => setText(x)} />
                }
            </div>
        </div>
    )
}


