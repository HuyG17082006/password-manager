import React, { useEffect } from 'react'

import { useParams } from 'react-router';

import * as service from '../../service/account/index.js'

import accountStore from '../../../../store/accountStore.js'
import useLoading from '../../../../shared/hooks/useLoading.jsx';

export default function useGetAccounts() {

    const { folderId = null } = useParams();

    const getAccounts = accountStore(state => state.getAccounts);
    const setAccounts = accountStore(state => state.setAccounts);

    const accountsData = getAccounts(folderId);

    const { loading, runFuncWithLoading } = useLoading();

    const get = async () => {

        const result = await runFuncWithLoading(() => {

            if (folderId === 'all' || !folderId)
                return service.getAll()

            if (folderId === 'no-folder')
                return service.getIsNoFolder();

            if (folderId)
                return service.getWithFolderId(folderId)
        })

        if (result?.isOk)
            setAccounts(folderId, result.accounts, result.total);

    }

    useEffect(() => {
        
        if (accountsData !== undefined)
                return;

        get();

    }, [folderId, accountsData]);

    return {
        accounts: accountsData?.accounts || [],
        total: accountsData?.totalAccounts,
        loading,

        refresh: get
    }
}
