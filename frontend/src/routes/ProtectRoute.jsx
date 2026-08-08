import React, { useEffect, useState, Navigate } from 'react'
import { replace, useNavigate } from 'react-router'

import authStore from '../store/authStore.js'
import useLoading from '../shared/hooks/useLoading.jsx'

import Fetch from '../services/Fetch.js'

import WaitingScreen from '../shared/components/WaitingScreen.jsx';

export default function ProtectRoute({ children }) {

    const [status, setStatus] = useState('pending');

    const { loading, runFuncWithLoading } = useLoading();

    const navigate = useNavigate();

    const refresh = async () => {

        const token = authStore.getState().accessToken;

        if (!token) {

            const result = await runFuncWithLoading(() => Fetch("/auth/refresh", {
                method: "GET"
            }));

            if (result === undefined)
                return;

            if (!result.isOk) {
                setStatus('failed');
                return;
            }

            if (result.isOk) {
                authStore.setState({ accessToken: result.accessToken })
                setStatus('success');
            }
        }
        else {

            setStatus('success');

        }

    }

    useEffect(() => {

        refresh();


    }, [])

    if (loading) {
        return <WaitingScreen />

        if (status === "failed") {
        return <Navigate to="/auth/login" replace />;
    }
    }

    if (status === "success")
        return (
            children
        )
}
