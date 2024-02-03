import { useAtomValue } from "jotai";
import { appStateAtom } from "../lib/atoms";
import { ExplorerPage, EditorPage } from "../features";

export function Root() {
    const { isInExplorerMode } = useAtomValue(appStateAtom);

    if (isInExplorerMode)
        return <ExplorerPage />

    return (
        <EditorPage />
    )
}