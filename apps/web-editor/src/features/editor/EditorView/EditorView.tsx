import { useState } from "react";
import { BasicView } from "./BasicView";
import { SyntaxHighlightedView } from "./SyntaxHighlightedView";
import { GenericTextButton } from "../../../ui/GenericTextButton";

export function EditorView(props: { text: string; setText: (text: string) => void; }) {

    const [isBasicView, setIsBasicView] = useState(true);

    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex justify-evenly">
                <GenericTextButton text="Raw" onClick={() => setIsBasicView(true)} />
                <GenericTextButton text="Highlighted" onClick={() => setIsBasicView(false)} />
            </div>

            <div className="flex-grow">
                <TextView isBasicView={isBasicView} {...props} />
            </div>
        </div>
    )
}

export function TextView(props: { isBasicView: boolean, text: string; setText: (text: string) => void; }) {

    if (props.isBasicView)
        return <BasicView {...props} />

    return <SyntaxHighlightedView {...props} />
}


