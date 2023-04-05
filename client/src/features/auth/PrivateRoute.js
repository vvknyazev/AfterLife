import {Outlet, useLocation, useNavigate} from "react-router-dom"
import {useEffect, useRef, useState} from 'react'
import {useRefreshMutation} from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import {useSelector} from 'react-redux'
import {selectCurrentToken} from "./authSlice"

const PrivateRoute = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const location = useLocation();
    // const isHomePage = location.pathname === '/';
    // const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/register';
    console.log("persist ", persist);
    const [trueSuccess, setTrueSuccess] = useState(false)

    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);

    console.log("auth on login page is ", auth);


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

    if (auth.token){
        navigate('/');
    } else{
        return <Outlet/>
    }



}
export default PrivateRoute