import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import commonApiSlice, {useChangeModelMutation, useGetFullOneQuery} from "../../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import s from './EditModel.module.css'
import Select from "react-select";
import {apiSlice} from "../../../app/api/apiSlice";
import {useDispatch} from "react-redux";

const EditModel = () => {
    const {modelId} = useParams();

    const {data: model, isLoading} = useGetFullOneQuery(modelId);
    const [changeModel, {isLoading: isChangeModelLoading}] = useChangeModelMutation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedGames, setSelectedGames] = useState([]);
    const [photoURL, setPhotoURL] = useState(null);

    const dispatch = useDispatch();

    const gameOptions = [
        {value: 'Dota 2', label: 'Dota 2'},
        {value: 'CS:GO', label: 'CS:GO'},
        {value: 'LOL', label: 'LOL'},
        {value: 'Valorant', label: 'Valorant'},
        {value: 'Fortnite', label: 'Fortnite'},
        {value: 'PUBG', label: 'PUBG'},
        {value: 'Apex', label: 'Apex'}
    ]

    useEffect(() => {
        if (model) {
            console.log(model);
            setEmail(model.email);
            setUsername(model.username);
            setPhotoURL(model.photo);
            setName(model.name);
            setBio(model.bio);

            const transformedGames = model?.games.map(game => {
                return {
                    value: game,
                    label: game
                };
            });
            setSelectedGames(transformedGames);
        }
    }, [model]);

    const handleUserInput = (e) => setUsername(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handleNameInput = (e) => setName(e.target.value)
    const handleBioInput = (e) => setBio(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    function handleFileChange(e) {
        setSelectedImage(e.target.files[0]);
    }

    if (isLoading || isChangeModelLoading) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>;
    }

    async function handleModelChange(e) {
        e.preventDefault();
        let games = [];
        for (let i in selectedGames) {
            games.push(selectedGames[i].value);
        }
        await changeModel({id: modelId, username, email, name, bio, photoURL, games});

        dispatch(commonApiSlice.util.resetApiState())
        dispatch(apiSlice.util.resetApiState())
    }

    return (
        <div className={s.container}>
            <h2>Change Model</h2>
            <form onSubmit={handleModelChange}>
                <div className={s.formInputs}>
                    <div className={s.fields}>
                        <label> Username <br/>
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
                        <label> Email <br/>
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
                        <label> Name <br/>
                            <input
                                id="name"
                                placeholder='Name'
                                autoFocus={false}
                                type='text'
                                value={name}
                                onChange={handleNameInput}
                                autoComplete="off"
                                required
                                aria-describedby="uidnote"
                                className={s.createInput}
                            />
                        </label>
                        <label> Bio <br/>
                            <input
                                id="bio"
                                placeholder='Bio'
                                autoFocus={false}
                                type='text'
                                value={bio}
                                onChange={handleBioInput}
                                autoComplete="off"
                                required
                                aria-describedby="uidnote"
                                className={s.createInput}
                            />
                        </label>
                    </div>
                    {/*<label> Фото Профиля </label>*/}
                    {/*<input onChange={handleFileChange} type="file" id="pic" name="pic"*/}
                    {/*       accept=".png, .jpg, .jpeg"*/}
                    {/*       className={s.inputFile}/>*/}
                    <img src={photoURL} alt="modelPhoto" className={s.photoView}/>

                    <label>Games:</label>
                    <Select
                        isMulti
                        name="games"
                        options={gameOptions}
                        className={s.selectorGames}
                        classNamePrefix="select"
                        defaultValue={selectedGames}
                        value={selectedGames}
                        onChange={setSelectedGames}
                    />
                    <button className={s.createModelButton}>Change</button>
                </div>
            </form>
        </div>
    );
};

export default EditModel;