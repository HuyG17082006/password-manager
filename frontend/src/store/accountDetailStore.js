import { create } from "zustand";

const initialAccount = {
    id: null,
    applicationName: "",
    username: "",
    email: "",
    owner: "",
    url: "",
    note: "",
    folderId: null,
    isPinned: false,

    createdAt: null,
    updatedAt: null
};

export default create((set, get) => ({

    isOpen: false,

    mode: "view", //    view | edit | create

    accountId : null,

    open(mode, { accountId = null } = {}) {
        console.log(accountId)
        set({
            isOpen: true,
            mode,
            accountId
        });
    },

    close() {
        set({
            isOpen: false,
            mode: "view",
            accountId : null
        });
    }

}))