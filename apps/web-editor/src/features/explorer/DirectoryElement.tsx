import { AppRouterOutput, trpc } from "../../lib/trpc";

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
        <button
            className="
                block underline
                text-blue-500 hover:text-blue-600 active:text-blue-700
            "
            onClick={() => changeDirectoryMutation.mutate(props.path)}
        >
            {props.name}
        </button>
    );
}
