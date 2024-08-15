import React, {useEffect, useState} from 'react';
import commonApiSlice, {useSaveInfoMutation, useUploadPhotoMutation} from "../../features/commonApiSlice";
import {useOutletContext} from "react-router-dom";
import {InfinitySpin} from "react-loader-spinner";
import s from "./Settings.module.css"
import Nav from "../../components/Nav/Nav";
import CropEasy from "../../components/crop/CropEasy";
import {toast, ToastContainer} from "react-toastify";
import {useDispatch} from "react-redux";
import {apiSlice} from "../../app/api/apiSlice";
import Select from "react-select";
import SettingsNav from "../../components/SettingsNav/SettingsNav";


const Settings = () => {
    const [upload, {isLoading: isUploadPhotoLoading}] = useUploadPhotoMutation();
    const [saveInfo, {isLoading: isSaveInfoLoading}] = useSaveInfoMutation();

    const dispatch = useDispatch();

    const [user] = useOutletContext();

    const [selectedImage, setSelectedImage] = useState();
    const [photoURL, setPhotoURL] = useState(null);

    const [openCrop, setOpenCrop] = useState(false);

    const [fileName, setFileName] = useState('');

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [buttonActive, setButtonActive] = useState(false);

    const [selectedGames, setSelectedGames] = useState([]);

    const [selectedGender, setSelectedGender] = useState("male");

    const [dob, setDob] = useState('');

    const handleGender = (gender) => {
        setSelectedGender(gender);
    };

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
        console.log(selectedGames);
        if (selectedGames !== []) {
            // setButtonActive(true);
        }
    }, [selectedGames])


    useEffect(() => {
        if (user) {
            if (user?.name) {
                setName(user.name)
            }
            if (user?.bio) {
                setBio(user.bio);
            }
            if (user?.games) {
                const transformedGames = user.games.map(game => {
                    return {
                        value: game,
                        label: game
                    };
                });
                setSelectedGames(transformedGames);
            }
        }
        setButtonActive(false);
    }, [])

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

    console.log("photourl: ", photoURL)
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

    useEffect(() => {
        setPhotoURL(user?.photo.includes('http') ? user?.photo : `${process.env.REACT_APP_API_URL}/${user?.photo}`);
    }, [])

    if (isUploadPhotoLoading || isSaveInfoLoading) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
        setButtonActive(true);
    }
    const handleBioChange = (e) => {
        setBio(e.target.value)
        setButtonActive(true);
    }

    async function saveChanges(e) {
        e.preventDefault();
        console.log('name: ', name)
        console.log('bio: ', bio)
        console.log('selectedGames: ', selectedGames)
        let games = [];
        for (let i in selectedGames) {
            games.push(selectedGames[i].value);
        }
        await saveInfo({name, bio, games});
        dispatch(commonApiSlice.util.resetApiState())
        dispatch(apiSlice.util.resetApiState())
        window.location.reload(false);
    }


    return (
        <div>
            <Nav user={user}/>
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
            <div className={s.settingsNav}>
                <SettingsNav/>
            </div>
            <div className={s.container}>
                <div className={s.content}>
                    <div className={s.avatarDesc}>
                        <h2>Изменение профиля</h2>
                        <p>Добавляемая вами информация видна всем, кто может просматривать ваш профиль.</p>
                    </div>

                    <div className={s.photoPreview}>
                        {/*<img src={photoURL} alt="photo"/>*/}

                        {/*{photoURL === user?.photo.includes('http') ? user?.photo : `${process.env.REACT_APP_API_URL}/${user?.photo}` ?*/}
                        {/*    <img src={photoURL} alt="photo"/>*/}
                        {/*    : <></>*/}
                        {/*}*/}
                        {/*<div className={s.textAndButton}>*/}
                        {/*    <p>Avatar must be .JPG, .JPEG or .PNG and cannot exceed 5M</p>*/}
                        {/*</div>*/}

                    </div>
                    {!openCrop ?
                        <>
                            <div className={s.photoPreview}>
                                <div className={s.photoBorder}></div>
                                {photoURL === user?.photo.includes('http') ? user?.photo : `${process.env.REACT_APP_API_URL}/${user?.photo}` ?
                                    <img src={photoURL} alt="photo" className={s.photoPreviewImg}/>
                                    : <></>
                                }


                                <form encType={"multipart/form-data"} className={s.uploadForm}>
                                    <input onChange={handleFileChange} type="file" id="pic" name="pic"
                                           accept=".png, .j pg, .jpeg"
                                           className={s.inputFile}/>

                                    <label htmlFor="pic" className={s.labelInputFile}>
                                        <img src="/settings/upload.svg"
                                             alt="upload"/>
                                    </label>
                                </form>
                            </div>
                        </>
                        :
                        <CropEasy {...{
                            photoURL,
                            setOpenCrop,
                            setPhotoURL,
                            setSelectedImage,
                            user,
                            fileName
                        }}/>
                    }
                    <form onSubmit={saveChanges}>
                        <div className={s.profileInfo}>
                            <div className={s.name}>
                                <label htmlFor="name">Твое имя</label>
                                <input type="text" id='name' className={s.inputField} maxLength={12}
                                       onChange={handleNameChange}
                                       value={name}
                                       autoComplete="off"
                                />
                            </div>
                            <div className={s.desc}>
                                <label htmlFor="bio">О тебе</label>
                                <textarea id='bio' className={s.textField} maxLength={100}
                                          onChange={handleBioChange}
                                          value={bio}
                                          autoComplete="off"/>
                            </div>
                            <div className={s.personal}>
                                <div>
                                    <p>Пол</p>
                                    <div className={s.toggleContainer}>
                                        <div
                                            className={`${s.toggleButton} ${
                                                selectedGender === "male" ? s.selected : ""
                                            }`}
                                            onClick={() => handleGender("male")}
                                        >
                                            М
                                        </div>
                                        <div
                                            className={`${s.toggleButton} ${
                                                selectedGender === "female" ? s.selected : ""
                                            }`}
                                            onClick={() => handleGender("female")}
                                        >
                                            Ж
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p>Дата рождения</p>
                                    <div className={s.dateOfBirth}>
                                        <input
                                            type="date"
                                            className={s.dateField}
                                            value={dob}
                                            onChange={(e) => setDob(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={s.lang}>
                                <p>Язык</p>
                                <div className={s.langBio}>
                                    <div className={s.langBioItem}><p>Русский</p></div>
                                    <div className={s.langBioItem}><p>Українська</p></div>
                                    <div className={s.langBioItem}><p>English</p></div>
                                </div>
                            </div>
                            <div className={s.addLang}>
                                <div className={s.search}>
                                    <img src="/nav/search.svg" alt="search"/>Добавить язык
                                </div>
                            </div>


                        </div>
                        {user?.role === "MODEL" ?
                            <div className={s.divSelectorGames}>
                                <label htmlFor="games">Games:</label>
                                <Select
                                    id='games'
                                    isMulti
                                    name="games"
                                    options={gameOptions}
                                    className={s.selectorGames}
                                    classNamePrefix="select"
                                    defaultValue={selectedGames}
                                    onChange={setSelectedGames}
                                    value={selectedGames}
                                />
                            </div> : <></>}

                        <div className={s.btn}>
                            {buttonActive
                                ?
                                <button type={"submit"} disabled={false} className={s.saveButton}>Сохранить</button>
                                :
                                <button type={"submit"} disabled={true} className={s.disabledButton}>Сохранить</button>
                            }
                        </div>
                    </form>
                    <div>
                        <div className={s.linkAcc}>
                            <h2>Привязать учетные записи</h2>
                            <p>Несколько шагов помогут получить максимум от платформы Afterlife</p>
                        </div>
                        <div className={s.social}>
                            <div className={s.linkItem}>
                                <div className={s.socialName}>
                                    <img src="/settings/steam.svg" alt="steam-ico"/>
                                    <p>Steam</p>
                                </div>
                                <div className={s.connectSocial}>
                                    <button>Подключить</button>
                                </div>
                            </div>
                            <p className={s.socialDesc}>Добавляет статистику игр из вашей библиотеки Steam</p>
                        </div>
                        <div className={s.social}>
                            <div className={s.linkItem}>
                                <div className={s.socialName}>
                                    <img src="/settings/insta.png" alt="insta-ico"/>
                                    <p>Instagram</p>
                                </div>
                                <div className={s.connectSocial}>
                                    <button>Подключить</button>
                                </div>
                            </div>
                            <p className={s.socialDesc}>Добавляет фотографии на вашу страницу профиля </p>
                        </div>
                        <div className={s.social}>
                            <div className={s.linkItem}>
                                <div className={s.socialName}>
                                    <img src="/settings/twitter.png" alt="twitter"/>
                                    <p>(Twitter)</p>
                                </div>
                                <div className={s.connectSocial}>
                                    <button>Подключить</button>
                                </div>
                            </div>
                            <p className={s.socialDesc}>Отображает последние и закрепленные посты  </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
        ;
};

export default Settings;
