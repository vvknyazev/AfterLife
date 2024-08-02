import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import commonApiSlice, {useChangeModelMutation, useGetFullOneQuery} from "../../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import s from './EditModel.module.css'
import Select from "react-select";
import {apiSlice} from "../../../app/api/apiSlice";
import {useDispatch} from "react-redux";
import CropAdmin from "../../../components/crop/CropAdmin";
import {toast, ToastContainer} from "react-toastify";

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
    const [openCrop, setOpenCrop] = useState(false);
    const [fileName, setFileName] = useState('');

    const dispatch = useDispatch();

    const gameOptions = [
        {value: 'Dota 2', label: 'Dota 2'},
        {value: 'CS2', label: 'CS2'},
        {value: 'LOL', label: 'LOL'},
        {value: 'Valorant', label: 'Valorant'},
        {value: 'Fortnite', label: 'Fortnite'},
        {value: 'PUBG', label: 'PUBG'},
        {value: 'Overwatch', label: 'Overwatch'}
    ]

    useEffect(() => {
        if (model) {
            console.log(model);
            setEmail(model.email);
            setUsername(model.username);
            setPhotoURL(`${process.env.REACT_APP_API_URL}/${model.photo}`);
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
        setFileName(e.target.files[0]?.name);


        if (checkFileSize(e) && isValidFileType(e.target.files[0])) {
            console.log('file checked... everything is alright');
            setOpenCrop(true);
            setPhotoURL(URL.createObjectURL(e.target.files[0]));
        } else {
            toast.error('image too large or file type is incorrect', {
                toastId: 'fileSize',
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
    }
    const isValidFileType = (file) => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        return allowedTypes.includes(file?.type);
    };
    const checkFileSize = (e) => {
        let file = e.target.files[0];
        let size = 5000000;
        let err = "";
        if (file?.size > size) {
            err += file?.type + 'is too large, please pick a smaller file\n';
            console.log('file.size: ', file.size)
            console.log(size);
        }
        if (err !== "") {
            console.log(err)
            return false
        }

        return true;
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

        const myFile = new File([selectedImage], fileName, {
            type: selectedImage?.type,
        });

        const formData = new FormData();
        formData.append('pic', myFile);
        formData.append('username', username);
        formData.append('id', modelId);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('games', JSON.stringify(games));
        await changeModel(formData);

        dispatch(commonApiSlice.util.resetApiState())
        dispatch(apiSlice.util.resetApiState())
    }

    return (
        !openCrop ?
            <div className={s.container}>
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
                        <label> Фото Профиля </label>
                        <input onChange={handleFileChange} type="file" id="pic" name="pic"
                               accept=".png, .jpg, .jpeg"
                               className={s.inputFile}/>
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
            </div> :
            <CropAdmin {...{
                photoURL,
                setOpenCrop,
                setPhotoURL,
                setSelectedImage,
                fileName
            }}/>
    );
};

export default EditModel;
