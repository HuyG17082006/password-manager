import { create } from "zustand";

const NOTIFY_DURATION = 2000;

export default create((set, get) => ({
    notis: [],

    add: (type = 'success', message, duration = NOTIFY_DURATION) => {

        const id = crypto.randomUUID();

        set((state) => ({
            notis: [
                {
                    id,
                    type,
                    message
                },
                ...state.notis
            ]
        }))

        setTimeout(() => {
            get().remove(id)
        }, NOTIFY_DURATION)

    },

    remove: (id) => {
        set(state => ({
            notis: state.notis.filter(noti => noti.id !== id)
        }))
    },

    success : (message, duration) => {
        get().add("success", message, duration);
    },

    error : (message, duration) => {
        get().add("error", message, duration);
    },

    warning : (message, duration) => {
        get().add("warning", message, duration);
    },
}))