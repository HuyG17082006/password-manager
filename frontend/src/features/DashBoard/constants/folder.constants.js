import {
    FaFolderOpen
} from "react-icons/fa";

export const FOLDER_DEFAULT = {
    name : "",
    isPinned : false
}

export const ERRORS_DEFAULT = {
    name : ""
}

export const SYSTEM_FOLDERS = [
    {
        id : "all",
        icon : FaFolderOpen,
        name : "All accounts"
    },

    {
        id : "no-folder",
        icon : FaFolderOpen,
        name : "No folder"
    },

    {
        id : "favorites",
        icon : FaFolderOpen,
        name : "Favorites"
    },
]