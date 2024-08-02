import React, {useState} from 'react';
import commonApiSlice, {
    useCreateModelMutation,
} from "../../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import s from './CreateModel.module.css'
import Select from "react-select";
import {apiSlice} from "../../../app/api/apiSlice";
import {useDispatch} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import CropAdmin from "../../../components/crop/CropAdmin";

const CreateModel = () => {
    // const {modelId} = useParams();

    // const {data: model, isLoading} = useGetFullOneQuery(modelId);
    const [createModel, {isLoading: isCreateModelLoading}] = useCreateModelMutation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedGames, setSelectedGames] = useState([]);
    const [photoURL, setPhotoURL] = useState('/nav/user-photo.jpeg');
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

    async function handleCreateModel(e) {
        e.preventDefault();

        console.log("file: ", selectedImage);
        console.log("fileName: ", fileName);

        const myFile = new File([selectedImage], fileName, {
            type: selectedImage?.type,
        });



        let games = [];
        for (let i in selectedGames) {
            games.push(selectedGames[i].value);
        }
        console.log("games: ", games);

        const formData = new FormData();
        formData.append('pic', myFile);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('games', JSON.stringify(games));


        await createModel(formData);
        dispatch(commonApiSlice.util.resetApiState())
        dispatch(apiSlice.util.resetApiState())
    }

    if (isCreateModelLoading) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
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
                <h2>Create Model</h2>
                <form onSubmit={handleCreateModel} encType={"multipart/form-data"}>
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
                            <label> Password <br/>
                                <input
                                    id="password"
                                    placeholder='Password'
                                    autoFocus={false}
                                    type='password'
                                    value={password}
                                    onChange={handlePwdInput}
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
                        <button className={s.createModelButton} type={'submit'}>Create</button>
                    </div>
                </form>
            </div>
            :
            <CropAdmin {...{
                photoURL,
                setOpenCrop,
                setPhotoURL,
                setSelectedImage,
                fileName
            }}/>

    );
};

export default CreateModel;
