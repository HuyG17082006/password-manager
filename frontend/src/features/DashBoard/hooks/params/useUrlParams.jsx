import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export default function useUrlParams( defaultParams ) {
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if ([...searchParams.keys()].length === 0) {
            setSearchParams(defaultParams)
        }
    }, [searchParams, setSearchParams, defaultParams])

    const params = {
        order: searchParams.get('order') || defaultParams.order,
        sort: searchParams.get('sort') || defaultParams.sort
    }

    const updateParams = (newParams) => {
        console.log(newParams)
        const merged = {
            ...params,
            ...newParams,
        }
        setSearchParams(merged)
    }

    const resetParams = () => setSearchParams(defaultParams)

    return {
        params,
        resetParams,
        updateParams,
    }
}
