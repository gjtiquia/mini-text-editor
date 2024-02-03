import { useAtomValue } from "jotai";
import { isInExplorerAtom } from "../lib/atoms";
import { ExplorerPage, EditorPage } from "../features";

export function Root() {
    const isInExplorer = useAtomValue(isInExplorerAtom);

    if (isInExplorer)
        return <ExplorerPage />

    return (
        <EditorPage />
    )
}