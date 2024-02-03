import { useSetAtom } from "jotai"
import { isInExplorerAtom } from "../../lib/atoms"

export function EditorPage() {
    const setIsInExplorer = useSetAtom(isInExplorerAtom);

    return (
        <div className="flex flex-col gap-4 p-2">
            <h1 className="font-bold text-center">
                Mini Text Editor: Explorer
            </h1>

            <div>
                <button
                    className="
                        block underline
                        text-blue-500 hover:text-blue-600 active:text-blue-700
                    "
                    onClick={() => setIsInExplorer(true)}
                >
                    Back To Explorer
                </button>
            </div>

            <p>TODO: Editor Page</p>
        </div>
    )
}