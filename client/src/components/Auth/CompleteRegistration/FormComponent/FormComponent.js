import React, {useEffect, useState} from 'react';
import styles from './FormComponent.module.css';

const FormComponent = ({username}) => {
    const [gender, setGender] = useState('male');
    const [nickname, setNickname] = useState('');
    const [dob, setDob] = useState('');

    useEffect(()=>{
       setNickname(username);
    },[])
    console.log("dob: ",dob);
    return (
        <div className={styles.formContainer}>
            <input
                type="text"
                placeholder="Введите ваш никнейм"
                className={styles.inputField}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <div className={styles.genderSelector}>
                <label className={gender === 'male' ? `${styles.active} ${styles.genderButton}`: styles.genderButton}>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                        onChange={() => setGender('male')}
                        className={gender === 'male' ? styles.active: ''}
                    />
                    <span>Я парень</span>
                </label>
                <label className={gender === 'female' ? `${styles.active} ${styles.genderButton}`: styles.genderButton}>
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
                className={dob ? `${styles.active} ${styles.dateField}` : styles.dateField}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            />
            <button className={styles.continue}>Далее</button>
        </div>
    );
};

export default FormComponent;
