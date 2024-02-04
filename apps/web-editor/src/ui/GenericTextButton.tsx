
export function GenericTextButton(props: { text: string; onClick: () => void; }) {
    return (
        <button
            className="
                        block underline
                        text-blue-500 hover:text-blue-600 active:text-blue-700
                    "
            onClick={() => props.onClick()}
        >
            {props.text}
        </button>
    );
}
