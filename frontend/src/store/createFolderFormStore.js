import { create } from "zustand";

export default create((set, get) => ({

    isOpen: false,

    open : () => {
        set({
            isOpen: true
        });

    },

    close : () => {
        set({
            isOpen: false
        });
    }

}));