import React, {useEffect, useState} from 'react';
import s from './CompleteRegistration.module.css'
import {useGetStepQuery} from "../../../features/commonApiSlice";
import CropEasy from "../../crop/CropEasy";
import {toast} from "react-toastify";
import {useOutletContext} from "react-router-dom";
import FormComponent from "./FormComponent/FormComponent";

const CompleteRegistration = () => {

    const {data: step, isLoading} = useGetStepQuery();

    const [user] = useOutletContext();

    const [photoURL, setPhotoURL] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);
    const [fileName, setFileName] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [localStep, setLocalStep] = useState(null);

    useEffect(() => {
        if (step !== undefined) {
            setLocalStep(step);
        }
    }, [step]);

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

    useEffect(() => {
        setPhotoURL(user?.photo.includes('http') ? user?.photo : `${process.env.REACT_APP_API_URL}/${user?.photo}`);
    }, [])

    const handleForm = (e) => {
        e.preventDefault();
    }
    console.log("localsteP: ", localStep)

    return (
        <div className={s.back}>
            <div className={s.nav}>
                <img src="A-single.svg" alt="a-single"/>
            </div>
            {localStep === 3 &&
                <div className={s.content}>
                    <h2>Завершение регистрации <span>1/4</span></h2>
                    <div className={s.profileSetting}>
                        <p>Настройка профиля</p>
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
                                             alt="upload"/>Загрузить фото
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
                    <div className={s.dataBlock}>
                        {/*<form onSubmit={handleForm}>*/}

                        {/*</form>*/}
                        <FormComponent username={user?.username} localStep={localStep} setLocalStep={setLocalStep}/>
                    </div>
                </div>
            }
            {localStep === 4 &&
                <h2>THIS IS STEP 4</h2>
            }

        </div>
    );
};

export default CompleteRegistration;
