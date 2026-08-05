import createFolderFormStore from "../../store/createFolderFormStore.js";

import React from 'react'

export default function useCreateFolderForm() {
    const {
        open,
        close,
        isOpen
    } = createFolderFormStore();

    return {
        open,
        close,
        isOpen
    }
}
