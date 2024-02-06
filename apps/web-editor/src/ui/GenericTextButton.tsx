interface GenericTextButtonProps {
    text: string;
    onClick: () => void;

    isDisabled?: boolean
}

export function GenericTextButton(props: GenericTextButtonProps) {

    if (props.isDisabled)
        return (
            <button
                className="
                        block
                        text-gray-500
                    "
                disabled={true}
            >
                {props.text}
            </button>
        )

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
