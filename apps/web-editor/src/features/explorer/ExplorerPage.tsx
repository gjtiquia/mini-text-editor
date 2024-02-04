import { trpc } from "../../lib/trpc"
import { GenericTextButton } from "../../ui/GenericTextButton";
import { DirectoryElement } from "./DirectoryElement";
import { FileElement } from "./FileElement";

export function ExplorerPage() {

    const utils = trpc.useUtils();
    const getContentsQuery = trpc.getContentsInCurrentDirectory.useQuery();
    const goBackMutation = trpc.goPreviousDirectory.useMutation({
        onSuccess: () => {
            utils.getContentsInCurrentDirectory.invalidate();
        }
    });

    if (getContentsQuery.isPending)
        return <p>Loading...</p>

    if (getContentsQuery.isError)
        return <p className="text-red-500">Error: {getContentsQuery.error.message}</p>

    return (
        <div className="flex flex-col gap-4 p-2 break-words">
            <h1 className="font-bold text-center">
                Mini Text Editor: Explorer
            </h1>

            <div>
                <GenericTextButton
                    text={"cd .."}
                    onClick={() => goBackMutation.mutate()}
                />
            </div>

            <div>
                <h2 className="font-bold">Root Path</h2>
                <div className="px-2">
                    <p>{getContentsQuery.data.rootPath}/</p>
                </div>
            </div>

            <div>
                <h2 className="font-bold">Current Path</h2>
                <div className="px-2">
                    <p>{getContentsQuery.data.relativePath}/</p>
                </div>
            </div>

            <div>
                <h2 className="font-bold">Directories</h2>
                <div className="px-2">
                    {getContentsQuery.data.contents.directories.map(data => {
                        return (
                            <DirectoryElement key={data.id} {...data} />
                        )
                    })}
                </div>
            </div>

            <div>
                <h2 className="font-bold">Files</h2>
                <div className="px-2">
                    {getContentsQuery.data.contents.files.map(data => {
                        return (
                            <FileElement key={data.id} {...data} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
