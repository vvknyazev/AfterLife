import React, {useEffect, useState} from 'react';
import styles from './FormComponent.module.css';
import commonApiSlice, {useCheckUsernameMutation, useCompleteRegistrationMutation} from "../../../../features/commonApiSlice";
import s from "../../../../pages/Auth/Auth.module.css";
import {ThreeDots} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";
import {apiSlice} from "../../../../app/api/apiSlice";
import {useDispatch} from "react-redux";

const FormComponent = ({username, localStep, setLocalStep}) => {
    const [gender, setGender] = useState('male');
    const [nickname, setNickname] = useState('');
    const [dob, setDob] = useState('');
    const [usernameExists, setUsernameExists] = useState(false);

    const [checkUsername, {isLoading}] = useCheckUsernameMutation();
    const [completeRegistration, {isLoading: isLoadingCompleteRegistration}] = useCompleteRegistrationMutation();

    const navigate = useNavigate();
    useEffect(() => {
        setNickname(username);
    }, [])


    const handleNickname = async (e) => {
        setNickname(e.target.value)
        try {
            const result = await checkUsername({nickname: e.target.value}).unwrap();
            console.log("result: ", result);
            if (result.exists) {
                setUsernameExists(result.exists);
            } else {
                setUsernameExists(result.exists);
            }
        } catch (error) {
            console.error('Error checking username:', error);
        }
    }
    const validateUsername = (name) => {
        const regex = /^[a-zA-Z0-9]{3,}$/;
        return regex.test(name);
    };

    const validateDateOfBirth = (date) => {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 16) {
            return false
        } else {
            return true;
        }
    };

    const handleSkip = () => {
        setLocalStep(4);
    }
    const dispatch = useDispatch();
    const handleContinue = async () => {
        try {
            const result = await completeRegistration({username: nickname, dob: dob, gender: gender});
            dispatch(commonApiSlice.util.resetApiState())
            dispatch(apiSlice.util.resetApiState())
            navigate('/profile');
        } catch (error) {
            console.error('Error checking username:', error);
        }
    }

    return (
        <div className={styles.formContainer}>
            <label className={styles.labelUsername}>
                <input
                    type="text"
                    placeholder="Введите ваш никнейм"
                    className={!usernameExists && validateUsername(nickname) ? `${styles.inputField} ${styles.active}` : `${styles.inputField} ${styles.wrong}`}
                    value={nickname}
                    maxLength={20}
                    onChange={(e) => handleNickname(e)}
                />
                <div className={styles.resultUsername}>
                    {usernameExists && validateUsername(nickname)
                        ?
                        <div className={styles.userCheckBlock}>
                            <p className={styles.taken}>Данный никнейм занят</p>
                            <img src="/settings/taken.svg" alt="taken"/>
                        </div>
                        :
                        validateUsername(nickname)
                            ?
                            <div className={styles.userCheckBlock}>
                                <p className={styles.free}>Никнейм свободен</p>
                                <img src="/settings/free.svg" alt="free"/>
                            </div>
                            :
                            <div className={styles.userCheckBlock}>
                                <p className={styles.taken}>Никнейм некорректный</p>
                                <img src="/settings/taken.svg" alt="taken"/>
                            </div>
                    }
                </div>
            </label>
            <div className={styles.genderSelector}>
                <label className={gender === 'male' ? `${styles.active} ${styles.genderButton}` : styles.genderButton}>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                        onChange={() => setGender('male')}
                        className={gender === 'male' ? styles.active : ''}
                    />
                    <span>Я парень</span>
                </label>
                <label
                    className={gender === 'female' ? `${styles.active} ${styles.genderButton}` : styles.genderButton}>
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === 'female'}
                        onChange={() => setGender('female')}
                    />
                    <span>Я девушка</span>
                </label>
            </div>
            <input
                type="date"
                className={validateDateOfBirth(dob) && dob ? `${styles.active} ${styles.dateField}` : styles.dateField}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            />

            <div className={styles.nextButtons}>
                <button className={styles.disableButton} onClick={handleSkip}>Пропустить</button>
                {isLoadingCompleteRegistration ?
                    <button
                        disabled={!validateDateOfBirth(dob) || !dob || !validateUsername(nickname) || usernameExists}
                        className={!validateDateOfBirth(dob) || !dob || !validateUsername(nickname) || usernameExists ? styles.disableButton : ''}
                        onClick={handleContinue}
                    >
                        <ThreeDots width='50' color="#000"/>
                    </button> :
                    <button
                        disabled={!validateDateOfBirth(dob) || !dob || !validateUsername(nickname) || usernameExists}
                        className={!validateDateOfBirth(dob) || !dob || !validateUsername(nickname) || usernameExists ? styles.disableButton : ''}
                        onClick={handleContinue}
                    >
                        Далее
                    </button>
                }

            </div>
        </div>
    );
};

export default FormComponent;
