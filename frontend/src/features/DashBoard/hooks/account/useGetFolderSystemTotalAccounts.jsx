import React, { useEffect, useState } from 'react'

import { getSystemFolderTotalAccounts } from '../../service/account/index.js'

import useLoading from '../../../../shared/hooks/useLoading.jsx';

export default function useGetAccounts() {

    const [overview, setOverview] = useState({})

    const { loading, runFuncWithLoading } = useLoading();

    const get = async () => {

        const result = await runFuncWithLoading(() => getSystemFolderTotalAccounts());

        if (result?.isOk)
            setOverview(result.total);

    }
    
    useEffect(() => {
        get();
    }, [])
    
    return {
        overview,
        loading,
        refresh : get
    }
}
