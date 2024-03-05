import { useState } from "react";
import { BasicView } from "./BasicView";
import { SyntaxHighlightedView } from "./SyntaxHighlightedView";
import { GenericTextButton } from "../../../ui/GenericTextButton";
import { PreviewView } from "./PreviewView.1";

type Tab = "Basic" | "Highlighted" | "Preview"

export function EditorView(props: { text: string; setText: (text: string) => void; }) {

    const [tab, setTab] = useState<Tab>("Basic");

    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex justify-evenly">
                <GenericTextButton text="Raw" onClick={() => setTab("Basic")} />
                <GenericTextButton text="Highlighted" onClick={() => setTab("Highlighted")} />
                <GenericTextButton text="Preview" onClick={() => setTab("Preview")} />
            </div>

            <div className="flex-grow">
                <TextView tab={tab} {...props} />
            </div>
        </div>
    )
}

export function TextView(props: { tab: Tab, text: string; setText: (text: string) => void; }) {

    if (props.tab === "Basic")
        return <BasicView {...props} />

    if (props.tab === "Highlighted")
        return <SyntaxHighlightedView {...props} />

    if (props.tab === "Preview")
        return <PreviewView {...props} />
}

