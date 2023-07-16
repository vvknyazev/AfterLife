import React, {useEffect, useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import Select from 'react-select';
import s from "./Admin.module.css";
import {useGetFullModelsQuery, useGetModelsQuery} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";

const Admin = () => {
    const [user, oauthUser] = useOutletContext();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    // const [photoURL, setPhotoURL] = useState(null);

    const [selectedGames, setSelectedGames] = useState([]);

    const navigate = useNavigate();

    const gameOptions = [
        {value: 'Dota 2', label: 'Dota 2'},
        {value: 'CS:GO', label: 'CS:GO'},
        {value: 'LOL', label: 'LOL'},
        {value: 'Valorant', label: 'Valorant'}
    ]

    // const {data: models, isLoading: isLoadingModels, isSuccess: isSuccessModels} = useGetModelsQuery();
    const {data: fullModels, isLoading: isLoadingFullModels, isSuccess: isSuccessFullModels} = useGetFullModelsQuery();


    const handleUserInput = (e) => setUsername(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    function handleFileChange(e) {
        setSelectedImage(e.target.files[0]);
    }

    if (isLoadingFullModels) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }
console.log("fullmodels: ", fullModels);
    if (isSuccessFullModels) {
        console.log("full: ", fullModels);
    }
    function handleModelChange(id){
        navigate('/admin/model/' + id);
    }
    const modelsTable = fullModels.map(el => <tr key={el._id}>
        <td>{el._id}</td>
        <td>{el.name}</td>
        <td>{el.bio}</td>
        <td>{el.email}</td>
        <td><img src={el.photo} alt="model"/></td>
        <td>
            <button onClick={() => handleModelChange(el._id)}>Change</button>
        </td>
    </tr>)
    return (
        <div className={s.container}>
            <h1>Welcome to the Admin Panel</h1>
            <br/>
            <table className={s.modelsTable}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Bio</th>
                    <th>Email</th>
                    <th>Photo</th>
                </tr>
                </thead>
                <tbody>
                {modelsTable}
                </tbody>
            </table>
            {/*<form>*/}
            {/*    <h2>Add Model</h2>*/}
            {/*    <div className={s.formInputs}>*/}
            {/*        <label>*/}
            {/*            <input*/}
            {/*                id="first_name"*/}
            {/*                placeholder='Username'*/}
            {/*                type='text'*/}
            {/*                value={username}*/}
            {/*                onChange={handleUserInput}*/}
            {/*                autoComplete="off"*/}
            {/*                required*/}
            {/*                className={s.createInput}*/}
            {/*            />*/}
            {/*        </label>*/}
            {/*        <label>*/}
            {/*            <input*/}
            {/*                id="email"*/}
            {/*                placeholder='Email'*/}
            {/*                autoFocus={false}*/}
            {/*                type='email'*/}
            {/*                value={email}*/}
            {/*                onChange={handleEmailInput}*/}
            {/*                autoComplete="off"*/}
            {/*                required*/}
            {/*                aria-describedby="uidnote"*/}
            {/*                className={s.createInput}*/}
            {/*            />*/}
            {/*        </label>*/}
            {/*        <label>*/}
            {/*            <input*/}
            {/*                id="password"*/}
            {/*                placeholder='Пароль'*/}
            {/*                type='password'*/}
            {/*                value={password}*/}
            {/*                onChange={handlePwdInput}*/}
            {/*                required*/}
            {/*                aria-describedby="pwdnote"*/}
            {/*                className={s.createInput}*/}
            {/*            />*/}
            {/*        </label>*/}
            {/*        <label> Фото Профиля </label>*/}
            {/*            <input onChange={handleFileChange} type="file" id="pic" name="pic"*/}
            {/*                   accept=".png, .jpg, .jpeg"*/}
            {/*                   className={s.inputFile}/>*/}

            {/*        <label>Games:</label>*/}
            {/*        <Select*/}
            {/*            isMulti*/}
            {/*            name="games"*/}
            {/*            options={gameOptions}*/}
            {/*            className={s.selectorGames}*/}
            {/*            classNamePrefix="select"*/}
            {/*            defaultValue={selectedGames}*/}
            {/*            onChange={setSelectedGames}*/}
            {/*        />*/}
            {/*        <button className={s.createModelButton}>Create Model</button>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    );
};

export default Admin;