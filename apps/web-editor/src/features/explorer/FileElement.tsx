import { useSetAtom } from "jotai";
import { AppRouterOutput } from "../../lib/trpc";
import { appStateAtom } from "../../lib/atoms";

type FileContent = AppRouterOutput["getContentsInCurrentDirectory"]["contents"]["files"][0]
interface FileElementProps extends FileContent { }

export function FileElement(props: FileElementProps) {
    const setAppState = useSetAtom(appStateAtom);

    function onFileClick() {
        setAppState({ isInExplorerMode: true, activeFilePath: "" });
    }

    return (
        <button
            className="
                block underline
                text-blue-500 hover:text-blue-600 active:text-blue-700
            "
            onClick={() => setAppState({ isInExplorerMode: false, activeFilePath: props.path })}
        >
            {props.name}
        </button>
    );
}
