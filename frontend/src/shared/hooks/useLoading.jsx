import { useState, useRef } from "react";

export default function useLoading() {

    const loadingRef = useRef(false);

    const [loading, setLoading] = useState(false);

    const runFuncWithLoading = async (fn) => {

        if (loadingRef.current)
            return;

        loadingRef.current = true;
        setLoading(true);

        try {

            return await fn();

        } finally {

            loadingRef.current = false;
            setLoading(false);

        }

    };

    return {
        loading,
        runFuncWithLoading
    };

}