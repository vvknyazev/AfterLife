import React, {useEffect, useState} from 'react';
import commonApiSlice, {useUploadPhotoMutation} from "../../features/auth/commonApiSlice";
import {useDispatch} from "react-redux";
import {NavLink, useOutletContext} from "react-router-dom";
import {InfinitySpin} from "react-loader-spinner";
import s from "./Settings.module.css"
import Nav from "../../components/Nav/Nav";
import CropEasy from "../../components/crop/CropEasy";


const Settings = () => {
    const [upload, {isLoading}] = useUploadPhotoMutation();
    // const [file, setFile] = useState();

    const [user, oauthUser] = useOutletContext();


    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState();
    const [photoURL, setPhotoURL] = useState(null);

    const [openCrop, setOpenCrop] = useState(false);

    const [fileName, setFileName] = useState('');


    function handleFileChange(e) {
        setSelectedImage(e.target.files[0]);
        setFileName(e.target.files[0].name);
        console.log('fileName: ', fileName)
        console.log("selected image: ", selectedImage);
        setOpenCrop(true);
        setPhotoURL(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        console.log('selectedImage was updated', selectedImage);
    }, [selectedImage])

    if (isLoading) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const myFile = new File([selectedImage], fileName, {
            type: selectedImage.type,
        });
        console.log('myNewFile: ', myFile)

        const formData = new FormData();
        formData.append('pic', myFile);
        await upload(formData);
        dispatch(commonApiSlice.util.resetApiState())
    }


    return (
        <div>
            <Nav user={user} oauthUser={oauthUser}/>
            <div className={s.container}>
                <div className={s.content}>
                    <h2>Settings page</h2>
                    {!openCrop ? <form onSubmit={handleSubmit} encType={"multipart/form-data"} className={s.uploadForm}>
                        <div><label htmlFor="pic">Select image:</label></div>
                        <div><input onChange={handleFileChange} type="file" id="pic" name="pic" accept="image/*"/></div>
                        {/*<button type="submit"/>*/}
                        <div>
                            <button type='submit'>Send</button>
                        </div>
                    </form> : <CropEasy {...{photoURL, setOpenCrop, setPhotoURL, setSelectedImage}}/>}

                    <NavLink to={'/welcome'}>To the profile</NavLink>
                </div>
                <div className={s.photoPreview}>
                    {photoURL ?
                        <img src={photoURL} alt="photo"/>
                        : <></>
                    }
                </div>
            </div>

        </div>
    );
};

export default Settings;