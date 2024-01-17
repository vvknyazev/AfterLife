import React, {useEffect, useRef, useState} from 'react';
import s from "./Auth.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../../features/auth/authApiSlice";
import commonApiSlice, {useActivateCodeMutation} from "../../features/commonApiSlice";
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
    const [password, setPassword] = useState('');
    const [persist, setPersist] = usePersist();
    const [errMsg, setErrMsg] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [step, setStep] = useState(1);

    const [register, {isLoading}] = useRegisterMutation();
    const [activateCode, {isLoading: isLoadingActivate, isSuccess: isSuccessActivation, isError: isErrorActivation}] = useActivateCodeMutation();

    const dispatch = useDispatch();

    const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    const EMAIL_REGEX = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const userData = await register({username, email, password}).unwrap();
            dispatch(setCredentials({...userData, email}));
            console.log("userdata: ");
            console.log(userData);
            setIsLoggedIn(true);
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

            await activateCode({activationCode: code}).then(result =>{
                console.log("result: ", result)

                if (result?.error?.status === 400){
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
                    </div>
                    {step === 1
                        ?
                        <>
                            <h4 className={s.authRegisterFormText}>Зарегистрироваться</h4>
                            <div className={s.authContainer}>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                                   aria-live="assertive">{errMsg}</p>
                                <form onSubmit={handleSubmit}>
                                    <div className={`${s.formInputs} ${s.formRegisterInputs}`}>
                                        <label>
                                            <input
                                                id="first_name"
                                                placeholder='Username'
                                                type='text'
                                                value={username}
                                                onChange={handleUserInput}
                                                autoComplete="off"
                                                required
                                            />
                                        </label>
                                        <label>
                                            <input
                                                id="email"
                                                className=''
                                                placeholder='Email'
                                                autoFocus={false}
                                                type='email'
                                                value={email}
                                                onChange={handleEmailInput}
                                                autoComplete="off"
                                                required
                                                aria-invalid={validEmail ? "false" : "true"}
                                                aria-describedby="uidnote"
                                                onFocus={() => setEmailFocus(true)}
                                                //onBlur={() => setEmailFocus(false)}
                                            />
                                            <p id="uidnote"
                                               className={emailFocus && !validEmail && email ? s.instructions : s.offscreen}>
                                                Неверный формат электронной почты
                                            </p>
                                        </label>
                                        <label>
                                            <input
                                                id="password"
                                                placeholder='Пароль'
                                                type='password'
                                                value={password}
                                                onChange={handlePwdInput}
                                                required
                                                aria-invalid={validPwd ? "false" : "true"}
                                                aria-describedby="pwdnote"
                                                onFocus={() => setPwdFocus(true)}
                                            />
                                            <p id="pwdnote"
                                               className={pwdFocus && !validPwd && password ? s.instructions : s.offscreen}>
                                                Пароль должен иметь не меньше 6 символов, содержать хотя бы одну
                                                заглавную и цифры
                                            </p>
                                        </label>

                                    </div>
                                    {isLoading ?
                                        <button disabled={!validEmail || !validPwd} className={s.loginButtonLoading}
                                                type='submit'><InfinitySpin width='150' color="#000"/></button> :
                                        <button disabled={!validEmail || !validPwd} className={s.loginButton}
                                                type='submit'>Зарегистрироваться</button>}

                                </form>
                                <NavLink to={'/login'} className={s.secondButton}>Есть акаунт?</NavLink>
                                <h3>Зарегистрироваться с помощью</h3>
                                <div className={s.social}>
                                    <a onClick={handleGoogleLogin}><img src="auth/ico/google.svg" alt="google"/></a>
                                    <a onClick={handleDiscordLogin}><img src="auth/ico/discord.svg" alt="discord"/></a>
                                </div>
                            </div>
                        </>
                        :
                        <div className={s.activationStep}>
                            <h3>
                                Введите код
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


                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Registration;