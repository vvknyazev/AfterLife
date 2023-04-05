import {Outlet, Link, useLocation, useNavigate} from "react-router-dom"
import {useEffect, useRef, useState} from 'react'
import {useRefreshMutation} from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import {useSelector} from 'react-redux'
import {selectCurrentToken} from "./authSlice"

const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    // const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/register';

    const [trueSuccess, setTrueSuccess] = useState(false)


    let isLoggedIn = false;

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
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

        // eslint-disable-next-line
    }, [])


    let content

    // if (isLoginOrRegisterPage && !isLoggedIn){
    //     return <Outlet context={isLoggedIn}/>
    // } else
    // if (isLoginOrRegisterPage && isLoggedIn){
    //     navigate("/");
    // }

    if (!persist) { // persist: no
        console.log('no persist')
        //setIsLoggedIn(false);
        isLoggedIn = false;
        return <Outlet context={isLoggedIn}/>
    } else if (isLoading) { //persist: yes, token: no
        console.log('loading')
        //setIsLoggedIn(false);
        isLoggedIn = false;
        content = <p>Loading...</p>
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        //setIsLoggedIn(false);
        isLoggedIn = false;
        if (isHomePage) {
            return <Outlet context={isLoggedIn}/>
        }

        content = (
            <p className='errmsg'>
                {error.data?.message}
                <Link to="/login">Please login again</Link>.
            </p>
        );
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success')
         isLoggedIn = true;
        return <Outlet context={isLoggedIn}/>
    } else if (token && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        //setIsLoggedIn(true);
        isLoggedIn = true;
        return <Outlet context={isLoggedIn}/>
    }
    return content


}
export default PersistLogin