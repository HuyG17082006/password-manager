import useCreateFolderForm from "../../../../shared/hooks/useCreateFolderForm.jsx";

import React, { useState } from 'react'

import { FOLDER_DEFAULT } from "../../constants/folder.constants.js";
import { ERRORS_DEFAULT } from "../../constants/folder.constants.js";

import useLoading from "../../../../shared/hooks/useLoading.jsx";

import * as service from '../../service/folder/index.js'
import folderStore from "../../../../store/folderStore.js";
import notifyStore from "../../../../store/notifyStore.js";

const validateFolder = ({ name }) => {

    const errors = {}

    if (!name || !name.trim())
        errors.name = 'Name is required'

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };

}

export default function useCreateFolder() {

    const noti = notifyStore.getState()

    const store = folderStore.getState();

    const [folder, setFolder] = useState(FOLDER_DEFAULT);

    const [errors, setErrors] = useState(ERRORS_DEFAULT);

    const { loading, runFuncWithLoading } = useLoading()

    const handleInput = (e) => {
        const { name, type, value, checked } = e.target;

        setFolder((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const create = async () => {

        const { valid, errors } = validateFolder(folder);
        if (!valid) {
            setErrors(errors);
            return;
        }
        console.log(folder)
        const result = await runFuncWithLoading(() => service.create(folder));

        if (result.isOk) {

            store.add(result.folder);

            noti.success('Created successfully')

        }
        else {
            setErrors(result.errors)
        }

    }

    return {
        folder,
        errors,

        handleInput,

        create
    }

}
