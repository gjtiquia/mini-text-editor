import { GenericTextButton } from "../../ui/GenericTextButton";

export function BackButton(props: { onClick: () => void }) {
    return (
        <GenericTextButton
            text="Back To Explorer"
            onClick={() => props.onClick()}
        />
    );
}


