import React, {useEffect, useRef, useState} from 'react';
import s from "./ActivationStep.module.css";
import {toast} from "react-toastify";
import commonApiSlice, {useActivateCodeMutation, useResendMutation} from "../../../features/commonApiSlice";
import {apiSlice} from "../../../app/api/apiSlice";
import {ThreeDots} from "react-loader-spinner";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const ActivationStep = ({emailNextStep, setStep}) => {

    const [activateCode, {
        isLoading: isLoadingActivate,
        isSuccess: isSuccessActivation,
        isError: isErrorActivation
    }] = useActivateCodeMutation();
    const [resend, {
        isLoading: isLoadingResend,
    }] = useResendMutation();

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const codeInputsRef = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ifCodeEntered = () => {
        for (let i of code) {
            if (i === '') return false;
        }
        return true;
    }
    const handleInputChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;

        setCode(newCode);

        if (value !== '' && index < 5) {
            codeInputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0) {
            const newCode = [...code];
            console.log("delete")
            newCode[index] = ''
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
                startTimer();
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

    const handleCodeSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }

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
                navigate('/complete');
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
    }
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [timer, setTimer] = useState(0);

    const startTimer = () => {
        setIsButtonDisabled(true);
        setTimer(60);
        const countdown = setInterval(() => {
            setTimer(prev => {
                if (prev === 1) {
                    clearInterval(countdown);
                    setIsButtonDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };
    const effectRan = useRef(false)
    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            startTimer();
        }
        return () => effectRan.current = true
    }, []);

    useEffect(()=>{
        if (ifCodeEntered()){
            handleCodeSubmit()
        }
    },[code])

    return (
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
                            <ThreeDots width='50' color="#fff"/>
                        </button>
                        :
                        ifCodeEntered() ?
                            <button type='submit' disabled={false}>
                                Далее
                            </button>
                            :
                            <button type='submit' disabled={true}>
                                Далее
                            </button>
                    }
                </div>
            </form>
            <div className={s.resend}>
                {isButtonDisabled ? (
                    <p>Можно отправить еще раз через {timer} сек</p>
                ) : (
                    <p>Не пришло? Можем ещё раз <span onClick={resendCode}>отправить</span></p>
                )}
            </div>
        </div>
    );
};

export default ActivationStep;
