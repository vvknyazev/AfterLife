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

    // const PWD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$");
    // const PWD_REGEX = new RegExp("^.*(?=.{6,})(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$");
    // const PWD_REGEX = /^(?=.*\w).{6,17}$/;
    // const EMAIL_REGEX = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])\n");
    //const EMAIL_REGEX = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
    const EMAIL_REGEX = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    // const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


    useEffect(() => {
        // userRef.current.focus()
        setPersist(true);
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    // useEffect(() => {
    //     setValidPwd(PWD_REGEX.test(password));
    // }, [password])

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
        window.open(`${process.env.REACT_APP_API_URL}/api/user/login/google`, '_self');
    }

    function handleDiscordLogin() {
        window.open(`${process.env.REACT_APP_API_URL}/api/user/login/discord`, "_self");
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        // const v2 = PWD_REGEX.test(password);
        if (!v1) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const userData = await login({email, password}).unwrap();
            dispatch(setCredentials({...userData, email}));
            console.log("userdata: ");
            console.log(userData);
            setIsLoggedIn(true);
            setEmail('');
            setPassword('');

            navigate('/profile')
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
        <div className={s.background}>
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
                        <div className={s.name}>
                            <NavLink to={'/'}><img src="auth/afterlife.svg" alt="afterlife"/></NavLink>
                        </div>
                    </div>
                    <h4>Войти</h4>
                    <div className={s.authContainer}>

                        <form onSubmit={handleSubmit}>
                            <div className={s.formInputs}>
                                <div className={s.wrapper}>
                                    <label
                                        className={`${s.labelEmail} ${!validEmail && email ? s.wrongLabel : emailFocus ? s.labelEmailFocused : ''}`}>
                                        Почта
                                    </label>
                                    {/*<label className={s.labelEmail}></label>*/}
                                    <input
                                        id="email"
                                        className={!validEmail && email ? s.wrong : ''}
                                        placeholder='Email'
                                        autoFocus={false}
                                        ref={userRef}
                                        type='email'
                                        value={email}
                                        onChange={handleUserInput}
                                        autoComplete="off"
                                        required
                                        aria-invalid={validEmail ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                    {/*<p id="uidnote"*/}
                                    {/*   className={emailFocus && !validEmail && email ? s.instructions : s.offscreen}>*/}
                                    {/*    Неверный формат электронной почты*/}
                                    {/*</p>*/}
                                </div>
                                <div className={s.wrapper}>
                                    <label className={`${s.labelPassword} ${pwdFocus ? s.labelPasswordFocused : ''}`}>
                                        Пароль
                                    </label>
                                    <div
                                        className={`${s.underPassword} ${pwdFocus ? s.underPasswordFocused : ''}`}>8-100
                                    </div>
                                    <input
                                        id="password"
                                        className=''
                                        placeholder='Пароль'
                                        type='password'
                                        value={password}
                                        onChange={handlePwdInput}
                                        required
                                        // aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />
                                    {/*<p id="pwdnote" className={pwdFocus && !validPwd && password ? s.instructions : s.offscreen}>*/}
                                    {/*    Пожалуйста, введите 6-17 букв или цифр*/}
                                    {/*</p>*/}
                                </div>
                            </div>
                            <div className={s.forgot}>
                                <NavLink to='/' className={s.forgotBtn}>Забыли пароль?</NavLink>
                            </div>
                            {/*<div className={s.policy}>*/}
                            {/*    <p>Нажимая кнопку «Начать», вы соглашаетесь с <NavLink to={'/'} className={s.policySpan}>Политикой конфиденциальности</NavLink> </p>*/}
                            {/*</div>*/}
                            {/*{isLoading ? <button disabled={!validEmail} className={s.loginButtonLoading}*/}
                            {/*                     type='submit'><InfinitySpin width='150' color="#000"/></button> :*/
                                <button disabled={!validEmail} className={s.loginButton}
                                        type='submit'>Войти</button>}


                        </form>

                        {/*<h3>Регистрация через соцсеть</h3>*/}
                        <p className={s.socialHeader}>Войти через соцсеть: </p>
                        <div className={s.social}>
                            <a onClick={handleGoogleLogin}><img src="auth/ico/google.png" alt="google"/> Google</a>
                            <a onClick={handleDiscordLogin}><img src="auth/ico/discord.png" alt="discord"/> Discord</a>
                        </div>
                        <div className={s.redirect}>
                            <p>Нет аккаунта? <NavLink to={'/register'} className={s.redirectButton}>Зарегистрироваться</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Login;
