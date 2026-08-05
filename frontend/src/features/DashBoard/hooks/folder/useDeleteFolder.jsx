import React from 'react'
import { useParams } from 'react-router'

import * as service from '../../service/folder/index.js'

import useLoading from '../../../../shared/hooks/useLoading.jsx';
import useConfirm from '../../../../shared/hooks/useConfirmBox.jsx'
import folderStore from '../../../../store/folderStore.js';

export default function useDeleteFolder() {

    const store = folderStore.getState();

    const params = useParams();

    const { folderId = null } = params;

    const { open : openConfirmBox, close } = useConfirm()

    const { loading, runFuncWithLoading } = useLoading();

    const softDelete = async () => openConfirmBox({
        title: "Chuyển vào thùng rác",
        message: "Xác nhận muốn chuyển thư mục vào thùng rác?",
        callback: async () => {
            console.log(folderId)
            const result = await runFuncWithLoading(() => service.softDelete(folderId));

            if (result.isOk) {
                store.delete(folderId);
                close
            }
        }
    })

    return {
        loading,

        softDelete
    }
}
