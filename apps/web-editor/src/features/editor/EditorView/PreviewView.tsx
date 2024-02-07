// TODO : use remarkJS

export function PreviewView(props: { text: string; }) {
    return (
        <textarea
            className="
                h-full w-full px-2 
                bg-transparent rounded-md border border-black
                font-mono whitespace-pre
            "
            value={props.text}
        />
    );
}
