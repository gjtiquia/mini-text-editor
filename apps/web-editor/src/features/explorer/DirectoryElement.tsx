import { AppRouterOutput, trpc } from "../../lib/trpc";
import { GenericTextButton } from "../../ui/GenericTextButton";

type DirectoryContent = AppRouterOutput["getContentsInCurrentDirectory"]["contents"]["directories"][0]
interface DirectoryElementProps extends DirectoryContent { }

export function DirectoryElement(props: DirectoryElementProps) {

    const utils = trpc.useUtils();
    const changeDirectoryMutation = trpc.changeCurrentDirectory.useMutation({
        onSuccess: () => {
            utils.getContentsInCurrentDirectory.invalidate();
        }
    })

    return (
        <GenericTextButton
            text={props.name}
            onClick={() => changeDirectoryMutation.mutate({ path: props.path })}
        />
    )
}
