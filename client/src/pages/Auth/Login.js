import React, {useEffect, useRef, useState} from 'react';
import Nav from "../../components/Nav/Nav";
import s from "./Auth.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLoginMutation} from "../../features/auth/authApiSlice";
import {setCredentials} from "../../features/auth/authSlice";
import usePersist from "../../hooks/usePersist";
import {InfinitySpin} from "react-loader-spinner";


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

    function handleGoogleLogin(){
        window.open(`${process.env.REACT_APP_API_URL}api/user/login/google`, "_self");
    }
    function handleDiscordLogin(){
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
    // const handleToggle = () => {
    //     setPersist(prev => !prev);
    //     console.log("persist: ", persist);
    // }

    return isLoading ? <div className={'loader'}>
        <InfinitySpin
            width='200'
            color="#000"
        />
    </div> : (
        <div>
            <Nav/>
            <div className={s.container}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <form className='login-form' onSubmit={handleSubmit}>
                    <h2 className={s.title}>Авторизация</h2>

                    <div className="flex-row">
                        <label className="lf--label" htmlFor="email">
                            <svg x="0px" y="0px" width="12px" height="13px">
                                <path fill="#B1B7C4"
                                      d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"/>
                            </svg>
                        </label>
                        <input
                            id="email"
                            className='lf--input'
                            placeholder='Email'
                            ref={userRef}
                            type='email'
                            value={email}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="flex-row">
                        <label className="lf--label" htmlFor="password">
                            <svg x="0px" y="0px" width="15px" height="5px">
                                <g>
                                    <path fill="#B1B7C4"
                                          d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"/>
                                </g>
                            </svg>
                        </label>
                        <input
                            id="password"
                            className='lf--input'
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={handlePwdInput}
                            required
                        />
                    </div>

                    <button className='lf--submit' type='submit'>LOGIN</button>

                    {/*<label htmlFor="persist" className="form__persist">*/}
                    {/*    <input*/}
                    {/*        type="checkbox"*/}
                    {/*        className="form__checkbox"*/}
                    {/*        id="persist"*/}
                    {/*        onChange={handleToggle}*/}
                    {/*        checked={persist}*/}
                    {/*    />*/}
                    {/*    Trust This Device*/}
                    {/*</label>*/}
                </form>

                <div className='lf--forgot'>
                    Нет аккаунта? <NavLink to={'/register'}>Зарегистрируйся!</NavLink>
                </div>
                <button className='lf--submit google' onClick={handleGoogleLogin}>LOGIN VIA GOOGLE</button>
                <button className='lf--submit google' onClick={handleDiscordLogin}>LOGIN VIA DISCORD</button>
            </div>
        </div>
    );
};

export default Login;