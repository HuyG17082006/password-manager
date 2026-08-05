import { create } from "zustand";

export default create((set, get) => ({

    folders : undefined,

    setFolders : (folders) => {
        set({
            folders
        })
    },

    add : (folder) => {
        set((state) => ({
            folders: [...state.folders, folder]
        }));
    },

    delete : (folderId) => {
        set((state) => ({
            folders : state.folders.filter((folder) => folder.id !== folderId)
        }))
    },

    updateTotal : (folderId) => {
        set((state) => ({
            folders : state.folders.map(folder => folder.id === folderId ? {...folder, totalAccounts : folder.totalAccounts + 1} : folder)
        }))
    }
}))