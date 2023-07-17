import React, {useState} from 'react';
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";
import s from "../../pages/Settings/Settings.module.css";
import {InfinitySpin} from "react-loader-spinner";
import {useUploadPhotoMutation} from "../../features/commonApiSlice";

const CropAdmin = ({photoURL, setOpenCrop, setPhotoURL, setSelectedImage}) => {
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(0);
    const [loading, setLoading] = useState(false);

    const [upload,{}] = useUploadPhotoMutation();

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const cropClose = () => {
        setOpenCrop(false);
    }

    async function handleSubmit() {
        try {
            setLoading(true);
            const {file, url} = await getCroppedImg(
                photoURL,
                croppedAreaPixels
            );

            setSelectedImage(file);
            setPhotoURL(url);
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

                            <Cropper
                                image={photoURL}
                                crop={crop}
                                zoom={zoom}
                                aspect={53/70}
                                onZoomChange={setZoom}
                                onCropChange={setCrop}
                                onCropComplete={cropComplete}
                                showGrid={false}
                            />

                            <div className='cropper-box__buttons'>
                                <button onClick={cropClose}>Cancel</button>
                                <button onClick={handleSubmit} className={s.inputFileSubmit}>Confirm</button>
                                {/*<button onClick={cropImage}>Crop</button>*/}
                            </div>


                    </div>

            }
        </div>
    );
};

export default CropAdmin;