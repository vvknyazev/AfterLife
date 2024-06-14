import React, {useEffect, useRef, useState} from 'react';
import s from "./Auth.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../../features/auth/authApiSlice";
import commonApiSlice, {useActivateCodeMutation, useResendMutation} from "../../features/commonApiSlice";
import {useDispatch} from "react-redux";
import usePersist from "../../hooks/usePersist";
import {setCredentials} from "../../features/auth/authSlice";
import {InfinitySpin} from "react-loader-spinner";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {apiSlice} from "../../app/api/apiSlice";

const Registration = () => {
    const userRef = useRef();
    const errRef = userRef;
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailNextStep, setEmailNextStep] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [persist, setPersist] = usePersist();
    const [errMsg, setErrMsg] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [step, setStep] = useState(1);
    console.log("email: ", email);
    const [register, {isLoading}] = useRegisterMutation();
    const [activateCode, {
        isLoading: isLoadingActivate,
        isSuccess: isSuccessActivation,
        isError: isErrorActivation
    }] = useActivateCodeMutation();
    const [resend, {
        isLoading: isLoadingResend,
    }] = useResendMutation();

    const dispatch = useDispatch();

    // const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    const PWD_REGEX = /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-]{8,}$/;
    const EMAIL_REGEX = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [pwdAgainFocus, setPwdAgainFocus] = useState(false);


    const [code, setCode] = useState(['', '', '', '', '', '']);
    const codeInputsRef = useRef([]);

    const handleInputChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;

        setCode(newCode);

        // Автоматически перевести фокус на следующий элемент при вводе
        if (value !== '' && index < 5) {
            codeInputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0) {
            const newCode = [...code];
            console.log("delete")
            newCode[index] = ''
            // if (index !== 5){
            //     newCode[index - 1] = ''; // Очищаем предыдущий инпут
            // } else{
            //     newCode[index] = ''
            // }
            setCode(newCode);
            codeInputsRef.current[index - 1].focus();
        }
    };
    const handlePaste = (event) => {
        event.preventDefault();
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('Text');

        // Проверка, что вставленный текст - 6-значный код
        if (/^\d{6}$/.test(pastedData)) {
            const newCode = pastedData.split('').slice(0, 6);
            setCode(newCode);
        }
    };


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

    console.log("emailNextStep: ", emailNextStep)
    const resendCode = async () => {
            await resend({email: emailNextStep}).then(result => {
                console.log("result: ", result)
                if (result?.data?.message === 'Activation code sent successfully.') {
                    toast.success('Код успешно отправлен!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    toast.error('Не удалось отправить код. Пожалуйста, попробуйте позже.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            }).catch(error => {
                toast.error('Не удалось отправить код. Пожалуйста, попробуйте позже.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
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
                // navigate('/activate')

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
        const handleCodeSubmit = async (e) => {
            e.preventDefault();

            await activateCode({activationCode: code}).then(result => {
                console.log("result: ", result)

                if (result?.error?.status === 400) {
                    toast.error('Неверный код активации', {
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
                } else {

                    dispatch(commonApiSlice.util.resetApiState())
                    dispatch(apiSlice.util.resetApiState())
                    navigate('/profile');
                }
            }).catch(error => {
                toast.error('Неверный код активации', {
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
            });
            // if (isLoadingActivate) {
            //     console.log('Мутация выполняется, дождитесь завершения.');
            //     return;
            // }
            //
            // if (isSuccessActivation){
            //     toast.success('Ваш аккаунт успешно активирован!', {
            //         position: "top-right",
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "light",
            //         transition: Bounce,
            //     });
            //     navigate('/profile')
            // } else if (isErrorActivation) {
            //     toast.error('Неверный код активации', {
            //         toastId: 'error1',
            //         position: "top-center",
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "dark",
            //     });
            // }

        }

        const handleUserInput = (e) => setUsername(e.target.value)
        const handleEmailInput = (e) => setEmail(e.target.value)
        const handlePwdInput = (e) => setPassword(e.target.value)
        const handlePwdAgainInput = (e) => setPasswordAgain(e.target.value)

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
                <div className={s.container}>
                    <div className={s.authForm}>

                        <div className={s.topRow}>
                            <div className={s.name}>
                                <NavLink to={'/'}><img src="auth/afterlife.svg" alt="afterlife"/></NavLink>
                            </div>
                        </div>
                        {step === 1
                            ?
                            <>
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
                                        {/*{isLoading ?*/}
                                        {/*    <button disabled={!validEmail || !validPwd} className={s.loginButtonLoading}*/}
                                        {/*            type='submit'><InfinitySpin width='150' color="#000"/></button> :*/
                                            <button disabled={!validEmail || !validPwd || password !== passwordAgain}
                                                    className={s.loginButton}
                                                    type='submit'>Зарегистрироваться</button>}

                                    </form>
                                    <p className={s.socialHeader}>Зарегистрироваться через соцсеть: </p>
                                    <div className={s.social}>
                                        <a onClick={handleGoogleLogin}><img src="auth/ico/google.png"
                                                                            alt="google"/> Google</a>
                                        <a onClick={handleDiscordLogin}><img src="auth/ico/discord.png"
                                                                             alt="discord"/> Discord</a>
                                    </div>
                                    <div className={s.redirect}>
                                        <p>Есть аккаунт? <NavLink to={'/login'}
                                                                  className={s.redirectButton}>Войти</NavLink>
                                        </p>
                                    </div>
                                </div>
                            </>
                            :
                            <div className={s.activationStep}>
                                <h2>
                                    {emailNextStep}
                                </h2>
                                <h3>
                                    Мы отправили вам код на ваш Email
                                </h3>
                                <form className={s.formInput} onSubmit={handleCodeSubmit}>
                                    <div className={s.codeInput}>
                                        {code.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (codeInputsRef.current[index] = el)}
                                                type="text"
                                                maxLength="1"
                                                value={digit}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={handlePaste}
                                            />
                                        ))}
                                    </div>
                                    <div className={s.buttonNext}>
                                        {isLoadingActivate ?
                                            <button type='submit' className={s.activateButtonLoading}>
                                                <InfinitySpin width='150' color="#000"/>
                                            </button>
                                            :
                                            <button type='submit'>
                                                Далее
                                            </button>
                                        }
                                    </div>
                                </form>
                                <div className={s.resend}>
                                    <p>Не пришло? Можем ещё раз <span onClick={resendCode}>отправить</span></p>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    };

    export default Registration;
