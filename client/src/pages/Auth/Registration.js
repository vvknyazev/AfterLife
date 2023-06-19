import React, {useEffect, useRef, useState} from 'react';
import Nav from "../../components/Nav/Nav";
import s from "./Auth.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../../features/auth/authApiSlice";
import {useDispatch} from "react-redux";
import usePersist from "../../hooks/usePersist";
import {setCredentials} from "../../features/auth/authSlice";
import {InfinitySpin} from "react-loader-spinner";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
    // const location = useLocation();
    // const isLoginPage = location.pathname === '/login';
    // const navigate = useNavigate();
    const userRef = useRef();
    const errRef = userRef;
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [persist, setPersist] = usePersist();
    const [errMsg, setErrMsg] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [register, {isLoading}] = useRegisterMutation();

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
        window.open(`${process.env.REACT_APP_API_URL}api/user/login/google`, "_self");
    }

    function handleDiscordLogin() {
        window.open(`${process.env.REACT_APP_API_URL}api/user/login/discord`, "_self");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await register({username, email, password}).unwrap();
            dispatch(setCredentials({...userData, email}));
            console.log("userdata: ");
            console.log(userData);
            setIsLoggedIn(true);
            setEmail('');
            setPassword('');
            console.log("NAVIGATE /ACTIVE");
            navigate('/activate')

        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Некорректный email или password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else if (err.originalStatus === 409) {
                setErrMsg('Пользователь с такими данными уже существует');
            } else {
                setErrMsg('Ошибка регистрации');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

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
            <div className={s.container}>
                <div className={s.authForm}>

                    <div className={`${s.topRow} ${s.topRegisterRow}`}>
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
                    <h4 className={s.authRegisterFormText}>Зарегистрируйтесь</h4>
                    <div className={s.authContainer}>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <form onSubmit={handleSubmit}>
                            <div className={`${s.formInputs} ${s.formRegisterInputs}`}>
                                <input
                                    id="first_name"
                                    placeholder='Username'
                                    ref={userRef}
                                    type='text'
                                    value={username}
                                    onChange={handleUserInput}
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    id="email"
                                    placeholder='Email'
                                    ref={userRef}
                                    type='email'
                                    value={email}
                                    onChange={handleEmailInput}
                                    autoComplete="off"
                                    required/>
                                <input
                                    id="password"
                                    placeholder='Пароль'
                                    type='password'
                                    value={password}
                                    onChange={handlePwdInput}
                                    required/>

                            </div>
                            {isLoading ?
                                <button className={s.loginButtonLoading} type='submit' style={{marginTop: "20px"}}>
                                    <InfinitySpin width='150' color="#000"/></button> :
                                <button className={s.loginButton} type='submit'
                                        style={{marginTop: "20px"}}>Зарегистрироваться</button>}

                            {/*<button className={s.loginButton} type='submit'*/}
                            {/*        style={{marginTop: "20px"}}>Зарегистрироваться*/}
                            {/*</button>*/}

                        </form>
                        <NavLink to={'/login'} className={s.secondButton}>Есть акаунт?</NavLink>
                        <h3>Зарегистрироваться с помощью</h3>
                        <div className={s.social}>
                            <a onClick={handleGoogleLogin}><img src="auth/ico/google.svg" alt="google"/></a>
                            <a onClick={handleDiscordLogin}><img src="auth/ico/discord.svg" alt="discord"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //     <Nav/>
        //     <div className={s.container}>
        //         <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        //         <form className='login-form' onSubmit={handleSubmit} autoComplete={"off"}>
        //             <h2 className={s.title}>Регистрация</h2>
        //
        //             <div className="flex-row">
        //                 <label className="lf--label" htmlFor="first_name">
        //                     <svg x="0px" y="0px" width="12px" height="13px">
        //                         <path fill="#B1B7C4"
        //                               d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"/>
        //                     </svg>
        //                 </label>
        //                 <input
        //                     id="first_name"
        //                     className='lf--input'
        //                     placeholder='Username'
        //                     ref={userRef}
        //                     type='text'
        //                     value={username}
        //                     onChange={handleUserInput}
        //                     autoComplete="off"
        //                     required
        //                 />
        //             </div>
        //
        //             <div className="flex-row">
        //                 <label className="lf--label" htmlFor="email">
        //                     <svg x="0px" y="0px" width="12px" height="13px">
        //                         <path fill="#B1B7C4"
        //                               d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"/>
        //                     </svg>
        //                 </label>
        //                 <input
        //                     id="email"
        //                     className='lf--input'
        //                     placeholder='Email'
        //                     type='email'
        //                     value={email}
        //                     onChange={handleEmailInput}
        //                     autoComplete="off"
        //                     required
        //                 />
        //
        //             </div>
        //
        //
        //             <div className="flex-row">
        //                 <label className="lf--label" htmlFor="password">
        //                     <svg x="0px" y="0px" width="15px" height="5px">
        //                         <g>
        //                             <path fill="#B1B7C4"
        //                                   d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"/>
        //                         </g>
        //                     </svg>
        //                 </label>
        //                 <input
        //                     id="password"
        //                     className='lf--input'
        //                     placeholder='Password'
        //                     type='password'
        //                     value={password}
        //                     onChange={handlePwdInput}
        //                     required
        //                 />
        //             </div>
        //
        //             {/*<div className="flex-row">*/}
        //             {/*    <label className="lf--label" htmlFor="confirm-password">*/}
        //             {/*        <svg x="0px" y="0px" width="15px" height="5px">*/}
        //             {/*            <g>*/}
        //             {/*                <path fill="#B1B7C4"*/}
        //             {/*                      d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"/>*/}
        //             {/*            </g>*/}
        //             {/*        </svg>*/}
        //             {/*    </label>*/}
        //             {/*    <input id="password" className='lf--input' placeholder='Confirm password' type='password' value={confirmPassword}*/}
        //             {/*           onChange={(e) => setConfirmPassword(e.target.value)}/>*/}
        //             {/*</div>*/}
        //
        //             <button className='lf--submit' type='submit'>REGISTER</button>
        //         </form>
        //
        //         <div className='lf--forgot'>
        //             Есть аккаунт? <NavLink to={'/login'}>Войдите!</NavLink>
        //         </div>
        //
        //     </div>
        // </div>
    );
};

export default Registration;