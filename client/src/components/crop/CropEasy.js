import React, {useState} from 'react';
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";
// import commonApiSlice from "../../features/auth/commonApiSlice";
// import {useDispatch} from "react-redux";
// import {InfinitySpin} from "react-loader-spinner";

const CropEasy = ({photoURL, setOpenCrop, setPhotoURL, setSelectedImage}) => {
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(0);


    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const cropImage = async () => {
        console.log('start')
        try {

            const {file, url} = await getCroppedImg(
                photoURL,
                croppedAreaPixels
            );
            setOpenCrop(false);
            setSelectedImage(file);
            console.log('file: ', file);
            setPhotoURL(url);

        } catch (error) {
            console.log(error);
        }
        console.log('end');
    }
    return (
        <div className='cropper-box'>
            <Cropper
                image={photoURL}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onZoomChange={setZoom}
                onCropChange={setCrop}
                onCropComplete={cropComplete}
            />
            <div className='cropper-box__buttons'>
                <button onClick={() => setOpenCrop(false)}>Cancel</button>
                <button onClick={cropImage}>Crop</button>
            </div>
        </div>
    );
};

export default CropEasy;