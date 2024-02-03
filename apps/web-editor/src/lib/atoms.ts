import { atom } from "jotai";

interface AppState {
    isInExplorerMode: boolean,
    activeFilePath: string,
}

export const appStateAtom = atom<AppState>({
    isInExplorerMode: true,
    activeFilePath: ""
})