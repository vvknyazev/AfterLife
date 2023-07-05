import React, {useState} from 'react';
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";
import s from "../../pages/Settings/Settings.module.css";
import {InfinitySpin} from "react-loader-spinner";
import commonApiSlice, {useUploadPhotoMutation} from "../../features/auth/commonApiSlice";
import {useDispatch} from "react-redux";
// import commonApiSlice from "../../features/auth/commonApiSlice";
// import {useDispatch} from "react-redux";
// import {InfinitySpin} from "react-loader-spinner";

const CropEasy = ({photoURL, setOpenCrop, setPhotoURL, setSelectedImage, user, oauthUser, fileName}) => {
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(0);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const [upload,{}] = useUploadPhotoMutation();

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const cropClose = () => {
        setOpenCrop(false);
        setPhotoURL(user?.photo || oauthUser?.user?.photo);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            const {file, url} = await getCroppedImg(
                photoURL,
                croppedAreaPixels
            );

            setSelectedImage(file);
            setPhotoURL(url);
            const myFile = new File([file], fileName, {
                type: file.type,
            });

            const formData = new FormData();
            formData.append('pic', myFile);
            await upload(formData);
            dispatch(commonApiSlice.util.resetApiState())
            setOpenCrop(false);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className={'box'}>

            {
                loading ? <div className={'loader'}>
                        <InfinitySpin
                            width='200'
                            color="#000"
                        />
                    </div> :

                        <div className='cropper-box'>
                            <h2>drag the box to crop the image</h2>
                            <form onSubmit={handleSubmit} encType={"multipart/form-data"}>
                                <Cropper
                                    image={photoURL}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onZoomChange={setZoom}
                                    onCropChange={setCrop}
                                    onCropComplete={cropComplete}
                                    showGrid={false}
                                />

                                <div className='cropper-box__buttons'>
                                    <button onClick={cropClose}>Cancel</button>
                                    <button type='submit' className={s.inputFileSubmit}>Confirm</button>
                                    {/*<button onClick={cropImage}>Crop</button>*/}
                                </div>
                            </form>

                        </div>

            }
        </div>
    );
};

export default CropEasy;