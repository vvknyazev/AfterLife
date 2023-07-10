import React, {useEffect, useState} from 'react';
import {useOutletContext} from "react-router-dom";
import Select from 'react-select';
import s from "./Admin.module.css";

const Admin = () => {
    const [user, oauthUser] = useOutletContext();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    // const [photoURL, setPhotoURL] = useState(null);

    const [selectedGames, setSelectedGames] = useState([]);

    const gameOptions = [
        { value: 'Dota 2', label: 'Dota 2' },
        { value: 'CS:GO', label: 'CS:GO' },
        { value: 'LOL', label: 'LOL' },
        { value: 'Valorant', label: 'Valorant' }
    ]
    useEffect(()=>{
       console.log(selectedGames)
    },[selectedGames])
    const handleUserInput = (e) => setUsername(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    function handleFileChange(e) {
        setSelectedImage(e.target.files[0]);
    }

    return (
        <div className={s.container}>
            <h1>Welcome to the Admin Panel</h1>
            <br/>
            <form>
                <h2>Add Model</h2>
                <div className={s.formInputs}>
                    <label>
                        <input
                            id="first_name"
                            placeholder='Username'
                            type='text'
                            value={username}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required
                            className={s.createInput}
                        />
                    </label>
                    <label>
                        <input
                            id="email"
                            placeholder='Email'
                            autoFocus={false}
                            type='email'
                            value={email}
                            onChange={handleEmailInput}
                            autoComplete="off"
                            required
                            aria-describedby="uidnote"
                            className={s.createInput}
                        />
                    </label>
                    <label>
                        <input
                            id="password"
                            placeholder='Пароль'
                            type='password'
                            value={password}
                            onChange={handlePwdInput}
                            required
                            aria-describedby="pwdnote"
                            className={s.createInput}
                        />
                    </label>
                    <label> Фото Профиля </label>
                        <input onChange={handleFileChange} type="file" id="pic" name="pic"
                               accept=".png, .jpg, .jpeg"
                               className={s.inputFile}/>

                    <label>Games:</label>
                    <Select
                        isMulti
                        name="games"
                        options={gameOptions}
                        className={s.selectorGames}
                        classNamePrefix="select"
                        defaultValue={selectedGames}
                        onChange={setSelectedGames}
                    />
                    <button className={s.createModelButton}>Create Model</button>
                </div>
            </form>
        </div>
    );
};

export default Admin;