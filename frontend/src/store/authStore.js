import { create } from 'zustand'

export default create((set, get) => ({

    accessToken: '',
    user: null,

    setAccessToken: (accessToken) => {
        set({
            accessToken
        })
    },

    setUser : (user) => {
        set({
            user
        })
    }

}))