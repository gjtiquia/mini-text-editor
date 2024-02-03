import { trpc } from "../lib/trpc"

export function ExplorerPage() {
    const getContentsQuery = trpc.getContentsInCurrentDirectory.useQuery();

    if (getContentsQuery.isPending)
        return <p>Loading...</p>

    if (getContentsQuery.isError)
        return <p className="text-red-500">Error: {getContentsQuery.error.message}</p>

    return (
        <div className="flex flex-col gap-4 p-2 break-words">
            <h1 className="font-bold text-center">
                Mini Text Editor
            </h1>

            <div>
                <h2 className="font-bold">Current Path</h2>
                <div className="px-2">
                    <p>{getContentsQuery.data.path}</p>
                </div>
            </div>

            <div>
                <h2 className="font-bold">Directories</h2>
                <div className="px-2">
                    {getContentsQuery.data.contents.directories.map(x => {
                        return (
                            <p>{x.name}</p>
                        )
                    })}
                </div>
            </div>

            <div>
                <h2 className="font-bold">Files</h2>
                <div className="px-2">
                    {getContentsQuery.data.contents.files.map(x => {
                        return (
                            <p>{x.name}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
