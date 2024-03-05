export function BasicView(props: { text: string; setText: (text: string) => void; }) {
    return (
        <textarea
            className="
                flex-grow min-h-0 p-2 
                bg-transparent rounded-md border border-black
                font-mono whitespace-pre leading-tight
            "
            value={props.text}
            onChange={e => props.setText(e.target.value)} />
    );
}
