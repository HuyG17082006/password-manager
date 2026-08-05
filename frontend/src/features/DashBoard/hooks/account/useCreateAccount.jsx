import React, { useState } from 'react'

import * as service from '../../service/account/index.js'

import { ACCOUNT_DEFAULT, ERRORS_DEFAULT } from '../../constants/account.constants.js';

import useLoading from '../../../../shared/hooks/useLoading.jsx';
import folderStore from '../../../../store/folderStore.js';
import accountStore from '../../../../store/accountStore.js';
import notifyStore from '../../../../store/notifyStore.js';

const validateAccount = (account) => {

    const errors = {};

    if (!account.applicationName?.trim())
        errors.applicationName = "Application name is required.";

    if (!account.username?.trim() && !account.email?.trim()) {
        errors.username = "Username or email is required.";
        errors.email = "Username or email is required.";
    }

    if (!account.password?.trim())
        errors.password = "Password is required.";

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };

}

export default function useCreateAccount() {

    const [account, setAccount] = useState(ACCOUNT_DEFAULT);

    const [errors, setErrors] = useState(ERRORS_DEFAULT);

    const { loading, runFuncWithLoading } = useLoading();

    const noti = notifyStore.getState();

    const fStore = folderStore.getState();

    const aStore = folderStore.getState();

    const handleInput = (e) => {
        const { name, type, value, checked } = e.target;

        setAccount((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const create = async () => {

        const { valid, errors } = validateAccount(account);
        if (!valid) {
            setErrors(errors);
            return;
        }

        const result = await runFuncWithLoading(() => service.create(account));

        if (result.isOk) {
            //Thông báo notify ra màn hình
            if (account.folderId) {
                fStore.updateTotal(account.folderId)
                aStore.add(account.folderId, account);
            }

            noti.success('Created successfully')

            return true;
        }
        else {
            setErrors(result.errors)
        }

        return false

    }

    const resetErrors = () => setErrors(ERRORS_DEFAULT);
    const resetAccount = () => setAccount(ACCOUNT_DEFAULT);

    return {
        loading,
        errors,
        account,

        create,

        handleInput,

        resetAccount,
        resetErrors
    }

}
