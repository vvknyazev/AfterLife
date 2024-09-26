import React, {useEffect, useRef, useState} from 'react';
import s from "./Auth.module.css";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../../features/auth/authApiSlice";
import {useDispatch} from "react-redux";
import usePersist from "../../hooks/usePersist";
import {setCredentials} from "../../features/auth/authSlice";
import {ThreeDots} from "react-loader-spinner";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ActivationStep from "../../components/Auth/ActivationStep/ActivationStep";
import ProfileStep from "../../components/Auth/ProfileStep/ProfileStep";

const Registration = () => {
    const userRef = useRef();
    const errRef = userRef;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailNextStep, setEmailNextStep] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [persist, setPersist] = usePersist();
    const [errMsg, setErrMsg] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const location = useLocation();
    const data = location.state;

    console.log("data: ", data);
    useEffect(() => {
        if (data?.step) {
            setStep(data.step)
        }
    }, [data])

    const [step, setStep] = useState(1);
    console.log("email: ", email);
    const [register, {isLoading}] = useRegisterMutation();


    const dispatch = useDispatch();

    // const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    const PWD_REGEX = /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-]{8,}$/;
    const EMAIL_REGEX = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [pwdAgainFocus, setPwdAgainFocus] = useState(false);


    useEffect(() => {
        // userRef.current.focus()
        setPersist(true);
    }, [])
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
    }, [password])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])
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
        window.open(`${process.env.REACT_APP_API_URL}/api/user/login/google`, "_self");
    }

    function handleDiscordLogin() {
        window.open(`${process.env.REACT_APP_API_URL}/api/user/login/discord`, "_self");
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const userData = await register({email, password}).unwrap();
            dispatch(setCredentials({...userData, email}));
            console.log("userdata: ");
            console.log(userData);
            setIsLoggedIn(true);
            setEmailNextStep(email);
            setEmail('');
            setPassword('');
            setStep(2);
            // console.log("NAVIGATE /ACTIVE");


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


    // const handleUserInput = (e) => setUsername(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handlePwdAgainInput = (e) => setPasswordAgain(e.target.value)

    return (
        <>
            {/*<div className={s.backgroundImage}>*/}
            {/*    <ImageComponent hash={'L8A0zO8^IT_401ogxuRjD+x]RjMx'} width={'100%'} height={'100vh'}*/}
            {/*                    src="/auth/back.png" alt="Background"/>*/}
            {/*</div>*/}
            <img
                loading={"lazy"}
                src="/auth/back.jpg"
                alt="Background"
                className={s.backgroundImage}
            />
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
            {step === 1
                ?
                <div className={s.container}>
                    <div className={s.authForm}>
                        <div className={s.topRow}>
                            <div className={s.name}>
                                <NavLink to={'/'}><img src="auth/afterlife.svg" alt="afterlife"/></NavLink>
                            </div>
                        </div>
                        <h4>Зарегистрироваться</h4>
                        <div className={s.authContainer}>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                               aria-live="assertive">{errMsg}</p>
                            <form onSubmit={handleSubmit}>
                                <div className={`${s.formInputs} ${s.formRegisterInputs}`}>
                                    {/*<div className={s.wrapper}>*/}
                                    {/*    <label>*/}
                                    {/*        <input*/}
                                    {/*            id="first_name"*/}
                                    {/*            placeholder='Username'*/}
                                    {/*            type='text'*/}
                                    {/*            value={username}*/}
                                    {/*            onChange={handleUserInput}*/}
                                    {/*            autoComplete="off"*/}
                                    {/*            required*/}
                                    {/*        />*/}
                                    {/*    </label>*/}
                                    {/*</div>*/}
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
                                            onChange={handleEmailInput}
                                            autoComplete="off"
                                            required
                                            aria-invalid={validEmail ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)}
                                        />
                                        {/*<p id="uidnote"*/}
                                        {/*   className={!validEmail && email ? s.instructions : s.offscreen}>*/}
                                        {/*    Неверный формат электронной почты*/}
                                        {/*</p>*/}
                                    </div>
                                    <div className={s.wrapper}>
                                        <label>
                                            <label
                                                className={`${s.labelPassword} ${!validPwd && password ? s.wrongPassword : pwdFocus ? s.labelPasswordFocused : ''}`}>
                                                Пароль
                                            </label>
                                            <div
                                                className={`${s.underPassword} ${!validPwd && password ? s.wrongUnderPassword : pwdFocus ? s.underPasswordFocused : ''}`}>8-100
                                            </div>
                                            <input
                                                id="password"
                                                className={!validPwd && password ? s.wrong : ''}
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
                                            {/*<p id="pwdnote"*/}
                                            {/*   className={pwdFocus && !validPwd && password ? s.instructions : s.offscreen}>*/}
                                            {/*    Пароль должен иметь не меньше 6 символов, содержать хотя бы одну*/}
                                            {/*    заглавную и цифры*/}
                                            {/*</p>*/}
                                        </label>
                                    </div>
                                    <div className={s.wrapper}>
                                        <label>
                                            <label
                                                className={`${s.labelPassword} ${password !== passwordAgain && passwordAgain ? s.wrongPassword : pwdAgainFocus ? s.labelPasswordFocused : ''}`}>
                                                Повторите пароль
                                            </label>
                                            {/*<div*/}
                                            {/*    className={`${s.underPassword} ${pwdAgainFocus ? s.underPasswordFocused : ''}`}>8-100*/}
                                            {/*</div>*/}
                                            <input
                                                id="passwordAgain"
                                                className={password !== passwordAgain && passwordAgain ? s.wrong : ''}
                                                placeholder='Повторите пароль'
                                                type='password'
                                                value={passwordAgain}
                                                onChange={handlePwdAgainInput}
                                                required
                                                // aria-invalid={validPwd ? "false" : "true"}
                                                aria-describedby="pwdnote"
                                                onFocus={() => setPwdAgainFocus(true)}
                                                onBlur={() => setPwdAgainFocus(false)}
                                            />

                                        </label>
                                    </div>
                                </div>
                                {/*<div className={s.policy}>*/}
                                {/*    <p>Нажимая кнопку «Начать», вы соглашаетесь с <NavLink to={'/'} className={s.policySpan}>Политикой конфиденциальности</NavLink> </p>*/}
                                {/*</div>*/}
                                {isLoading ?
                                    <button disabled={!validEmail || !validPwd} className={s.loginButtonLoading}
                                            type='submit'><ThreeDots width='50' color="#fff"/></button> :
                                    <button disabled={!validEmail || !validPwd || password !== passwordAgain}
                                            className={s.loginButton}
                                            type='submit'>Зарегистрироваться</button>}

                            </form>
                            {/*<p className={s.socialHeader}>Зарегистрироваться через соцсеть: </p>*/}
                            {/*<div className={s.social}>*/}
                            {/*    <a onClick={handleGoogleLogin}><img src="auth/ico/google.png"*/}
                            {/*                                        alt="google"/> Google</a>*/}
                            {/*    <a onClick={handleDiscordLogin}><img src="auth/ico/discord.png"*/}
                            {/*                                         alt="discord"/> Discord</a>*/}
                            {/*</div>*/}
                            <div className={s.redirect}>
                                <p>Есть аккаунт? <NavLink to={'/login'}
                                                          className={s.redirectButton}>Войти</NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                step === 2 ?
                    <div className={s.container}>
                        <div className={s.authForm}>
                            <div className={s.topRow}>
                                <div className={s.name}>
                                    <NavLink to={'/'}><img src="auth/afterlife.svg" alt="afterlife"/></NavLink>
                                </div>
                            </div>
                            <ActivationStep emailNextStep={emailNextStep} setStep={setStep}/>
                        </div>
                    </div>
                    :
                    <ProfileStep/>
            }
        </>
    )
        ;
};

export default Registration;
