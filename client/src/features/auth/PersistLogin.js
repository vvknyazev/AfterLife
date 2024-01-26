import {Outlet} from "react-router-dom"
import React, {useEffect, useRef, useState} from 'react'
import {useGetUserQuery, useRefreshMutation} from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import {useSelector} from 'react-redux'
import {selectCurrentToken} from "./authSlice"
import {InfinitySpin} from "react-loader-spinner";

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const {data: user, isLoading: isLoadingUser, isFetching} = useGetUserQuery();

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
    }] = useRefreshMutation()

    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response =
                    await refresh()
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                } catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()

        }

        return () => effectRan.current = true

    }, [])

    console.log("user: ", user);
    if (isLoadingUser) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }
    if (isFetching) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }
    let content

    if (!persist) { // persist: no
        return <Outlet context={[null, null]}/>
    } else if (isLoading) { //persist: yes, token: no
        content = <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    } else if (isError) { //persist: yes, token: no
        return <Outlet context={[null, null]}/>
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        return <Outlet context={[user, null]}/>
    } else if (token && isUninitialized) { //persist: yes, token: yes
        return <Outlet context={[user, null]}/>
    }
    return content


}
export default PersistLogin