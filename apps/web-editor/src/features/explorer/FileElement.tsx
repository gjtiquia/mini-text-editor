import { useSetAtom } from "jotai";
import { AppRouterOutput } from "../../lib/trpc";
import { isInExplorerAtom } from "../../lib/atoms";

type FileContent = AppRouterOutput["getContentsInCurrentDirectory"]["contents"]["files"][0]
interface FileElementProps extends FileContent { }

export function FileElement(props: FileElementProps) {
    const setIsInExplorer = useSetAtom(isInExplorerAtom);

    return (
        <button
            className="
                block underline
                text-blue-500 hover:text-blue-600 active:text-blue-700
            "
            onClick={() => setIsInExplorer(false)}
        >
            {props.name}
        </button>
    );
}
