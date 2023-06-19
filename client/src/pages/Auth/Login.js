import React, {useEffect, useRef, useState} from 'react';
import s from "./Auth.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLoginMutation} from "../../features/auth/authApiSlice";
import {setCredentials} from "../../features/auth/authSlice";
import usePersist from "../../hooks/usePersist";
import {InfinitySpin} from "react-loader-spinner";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const userRef = useRef();
    const errRef = userRef;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const [persist, setPersist] = usePersist();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [login, {isLoading}] = useLoginMutation();


    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus()
        setPersist(true);
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    useEffect(() => {
        if (errMsg) {
            console.log("errMsg changed? ", errMsg);
            toast.error(`${errMsg}`, {
                toastId: 'error1',
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setErrMsg('');
        }
    })

    function handleGoogleLogin() {
        window.open(`${process.env.REACT_APP_API_URL}api/user/login/google`, '_self');
    }

    function handleDiscordLogin() {
        window.open(`${process.env.REACT_APP_API_URL}api/user/login/discord`, "_self");
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({email, password}).unwrap();
            dispatch(setCredentials({...userData, email}));
            console.log("userdata: ");
            console.log(userData);
            setIsLoggedIn(true);
            setEmail('');
            setPassword('');

            navigate('/welcome')
            window.location.reload(false);

        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Неверный логин или пароль');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    const handleUserInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    // isLoading ? <div className={'loader'}>
    //     <InfinitySpin
    //         width='200'
    //         color="#000"
    //     />
    // </div> :
    return (
        <div style={{
            backgroundImage: `url(auth/auth-back.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />
            {/*<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>*/}
            <div className={s.container}>
                <div className={s.authForm}>

                    <div className={s.topRow}>
                        <div>
                            <NavLink to='/'>
                                <img src="auth/ico/close.svg" alt="close"/>
                            </NavLink>
                        </div>
                        <div className={s.name}>
                            <img src="auth/afterlife.svg" alt="afterlife"/>
                        </div>
                        <div>
                            <a href="">
                                <img src="auth/ico/lang3.svg" alt="lang"/>
                            </a>
                        </div>
                        {/*<div className={s.lang}>*/}
                        {/*    <img src="auth/ico/lang.svg" alt="lang"/>*/}
                        {/*</div>*/}
                    </div>
                    <h4>Войдите</h4>
                    <div className={s.authContainer}>

                        <form onSubmit={handleSubmit}>
                            <div className={s.formInputs}>
                                <input
                                    id="email"
                                    className=''
                                    placeholder='Email'
                                    ref={userRef}
                                    type='email'
                                    value={email}
                                    onChange={handleUserInput}
                                    autoComplete="off"
                                    required/>
                                <input
                                    id="password"
                                    className=''
                                    placeholder='Пароль'
                                    type='password'
                                    value={password}
                                    onChange={handlePwdInput}
                                    required/>

                            </div>
                            <div className={s.forgot}>
                                <NavLink to='/'>Не помню</NavLink>
                            </div>
                            {isLoading ? <button className={s.loginButtonLoading} type='submit'><InfinitySpin width='150' color="#000"/></button> : <button className={s.loginButton} type='submit'>Войти</button>}


                        </form>
                        <NavLink to={'/register'} className={s.secondButton}>Зарегистрироваться</NavLink>
                        <h3>Войти с помощью</h3>
                        <div className={s.social}>
                            <a onClick={handleGoogleLogin}><img src="auth/ico/google.svg" alt="google"/></a>
                            <a onClick={handleDiscordLogin}><img src="auth/ico/discord.svg" alt="discord"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Login;