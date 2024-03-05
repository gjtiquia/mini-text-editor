import Markdown from 'react-markdown';


export function PreviewView(props: { text: string; setText: (text: string) => void; }) {

    return (
        <div
            className="
                h-full w-full p-2 prose
                bg-transparent rounded-md border border-black 
            "
        >
            <Markdown>{props.text}</Markdown>
        </div>
    );
}
