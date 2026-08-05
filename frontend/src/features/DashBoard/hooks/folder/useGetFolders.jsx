import { useEffect } from "react";

import folderStore from "../../../../store/folderStore.js";
import useLoading from "../../../../shared/hooks/useLoading.jsx";

import * as service from "../../service/folder/index.js";

export default function useGetFolders() {

    const folders = folderStore(state => state.folders);
    const setFolders = folderStore(state => state.setFolders);

    const { loading, runFuncWithLoading } = useLoading();

    const getAll = async () => {

        const result = await runFuncWithLoading(() =>
            service.getAll()
        );

        if (result?.isOk)
            setFolders(result.list);

    };

    useEffect(() => {

        if (folders !== undefined)
            return;

        getAll();

    }, []);

    return {
        folders : folders || [],
        loading,

        refresh: getAll
    };

}