export function EditorView(props: { text: string; setText: (text: string) => void; }) {
    return (
        <textarea
            className="
                h-full w-full px-2 
                bg-transparent rounded-md border border-black
                font-mono whitespace-pre
            "
            value={props.text}
            onChange={e => props.setText(e.target.value)} />
    );
}
