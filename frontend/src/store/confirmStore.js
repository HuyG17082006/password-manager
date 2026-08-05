import { create } from "zustand";

const confirmStore = create((set, get) => ({
    isOpen: false,

    title: "",
    message: "",
    callback: null,

    open: ({
        title,
        message,
        callback
    }) => {
        
        set({
            isOpen: true,
            title,
            message,
            callback
        })

        console.log(get())
    },

    close: () =>
        set({
            isOpen: false,
            title: "",
            message: "",
            callback: null
        })
}))

export default confirmStore