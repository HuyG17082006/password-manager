import accountDetailStore from "../../store/accountDetailStore.js";

import React from 'react'

export default function useAccountDetail() {

    const {
        open,
        close,
        isOpen,
        mode,
        accountId
    } = accountDetailStore();

    return {
        open,
        close,
        isOpen,
        mode,
        accountId
    }
}
