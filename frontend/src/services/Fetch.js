import authStore from "../store/authStore.js"

const BASE_API = import.meta.env.VITE_BASE_SERVER_API

console.log(BASE_API)

const Fetch = async (url, options = {}, attempt = 0) => {

    let deviceId = localStorage.getItem('Device-Id');
    if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem('Device-Id', deviceId); 
    }
    
    const accessToken = authStore.getState().accessToken

    const requestOptions = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Device-Id" : `${deviceId}`,
            ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
        },
        credentials: "include"
    }

    try {
        const result = await fetch(`${BASE_API}${url}`, requestOptions)
        const data = await result.json().catch(() => ({}))
        
        if (!result.ok) {
            const isTokenExpired = data?.TOKEN_EXPIRED || data?.message === "TOKEN_EXPIRED"

            if (isTokenExpired && attempt === 0) {
                console.log(1)
                return reFetch(url, options)
            }

            return {
                isOk: false,
                status: result.status,
                ...data
            }
        }

        return {
            isOk: true,
            status: result.status,
            ...data
        }
    } catch (err) {
        console.error(err)

        return {
            isOk: false,
            message: "Network error"
        }
    }
}

const reFetch = async (url, options) => {
    try {
        const refreshResult = await fetch(`${BASE_API}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const refreshData = await refreshResult.json().catch(() => ({}))

        if (refreshResult.ok && refreshData?.accessToken) {
            authStore.setState({ accessToken: refreshData.accessToken })
            return Fetch(url, options, 1)
        }

        authStore.setState({ accessToken: "" })

        return {
            isOk: false,
            status: refreshResult.status,
            ...refreshData
        }
    } catch (err) {
        authStore.setState({ accessToken: "" })
        console.error(err)

        return {
            isOk: false,
            message: "Refresh failed"
        }
    }
}

export default Fetch