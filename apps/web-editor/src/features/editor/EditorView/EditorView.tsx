import { BasicView } from "./BasicView";
import { SyntaxHighlightedView } from "./SyntaxHighlightedView";

export function EditorView(props: { text: string; setText: (text: string) => void; }) {

    const isBasicView = false;
    // const isBasicView = true;

    if (isBasicView)
        return <BasicView {...props} />

    return <SyntaxHighlightedView {...props} />
}


