import { trpc } from "../lib/trpc"

export function ExplorerPage() {
    const greetingQuery = trpc.greeting.useQuery();

    if (greetingQuery.isPending)
        return <p>Loading...</p>

    if (greetingQuery.isError)
        return <p className="text-red-500">Error: {greetingQuery.error.message}</p>

    return (
        <p>{greetingQuery.data.message}</p>
    )
}
