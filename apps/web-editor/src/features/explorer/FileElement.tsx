import { useSetAtom } from "jotai";
import { AppRouterOutput } from "../../lib/trpc";
import { appStateAtom } from "../../lib/atoms";
import { GenericTextButton } from "../../ui/GenericTextButton";

type FileContent = AppRouterOutput["getContentsInCurrentDirectory"]["contents"]["files"][0]
interface FileElementProps extends FileContent { }

export function FileElement(props: FileElementProps) {
    const setAppState = useSetAtom(appStateAtom);

    function onFileClick() {
        setAppState({ isInExplorerMode: true, activeFilePath: "" });
    }

    return (
        <GenericTextButton
            text={props.name}
            onClick={() => setAppState({ isInExplorerMode: false, activeFilePath: props.path })}

        />
    )
}
