import React, {useEffect, useState} from 'react';
import {useUploadPhotoMutation} from "../../features/auth/commonApiSlice";
import {useOutletContext} from "react-router-dom";
import {InfinitySpin} from "react-loader-spinner";
import s from "./Settings.module.css"
import Nav from "../../components/Nav/Nav";
import CropEasy from "../../components/crop/CropEasy";
import {toast, ToastContainer} from "react-toastify";


const Settings = () => {
    const [upload, {isLoading}] = useUploadPhotoMutation();

    const [user, oauthUser] = useOutletContext();

    const [selectedImage, setSelectedImage] = useState();
    const [photoURL, setPhotoURL] = useState(null);

    const [openCrop, setOpenCrop] = useState(false);

    const [fileName, setFileName] = useState('');

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
        setPhotoURL(user?.photo || oauthUser?.user?.photo);
    }, [])

    if (isLoading) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }


    return (
        <div>
            <Nav user={user} oauthUser={oauthUser}/>
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
            <div className={s.container}>
                <h2>Settings page</h2>
                <div className={s.content}>
                    <h2>Avatar</h2>
                    <div className={s.photoPreview}>
                        {/*<img src={photoURL} alt="photo"/>*/}

                        {photoURL === user?.photo || photoURL === oauthUser?.user?.photo ?
                            <img src={photoURL} alt="photo"/>
                            : <></>
                        }
                        <div className={s.textAndButton}>
                            <p>Avatar must be .JPG, .JPEG or .PNG and cannot exceed 5M</p>
                        </div>

                    </div>
                    {!openCrop ?
                        <form encType={"multipart/form-data"} className={s.uploadForm}>
                            <input onChange={handleFileChange} type="file" id="pic" name="pic"
                                   accept=".png, .jpg, .jpeg"
                                   className={s.inputFile}/>
                            <label htmlFor="pic" className={s.labelInputFile}>Change</label>
                        </form>
                        :
                        <CropEasy {...{
                            photoURL,
                            setOpenCrop,
                            setPhotoURL,
                            setSelectedImage,
                            user,
                            oauthUser,
                            fileName
                        }}/>
                    }
                    <hr/>
                </div>

            </div>

        </div>
    );
};

export default Settings;