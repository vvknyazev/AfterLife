import React, {useState} from 'react';
import {useUploadPhotoMutation} from "../../features/auth/commonApiSlice";
import {setCredentials} from "../../features/auth/authSlice";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";


const Settings = () => {
    const [upload, {isLoading}] = useUploadPhotoMutation();
    const [file, setFile] = useState();

    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState(null);

    function handleFileChange(e) {
        setSelectedImage(e.target.files[0]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('pic', selectedImage);
        await upload( formData );
    }

    return (
        <div>
            Settings page
            <form onSubmit={handleSubmit} encType={"multipart/form-data"}>
                <label htmlFor="pic">Select image:</label>
                <input onChange={handleFileChange} type="file" id="pic" name="pic" accept="image/*"/>
                {/*<button type="submit"/>*/}
                <button type='submit'>Send</button>
            </form>
            <NavLink to={'/welcome'}>To the profile</NavLink>

            {/*{selectedImage && (*/}
            {/*    <div>*/}
            {/*        <img*/}
            {/*            alt="not found"*/}
            {/*            width={"250px"}*/}
            {/*            src={URL.createObjectURL(selectedImage)}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        <button onClick={() => setSelectedImage(null)}>Remove</button>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*<br />*/}
            {/*<br />*/}

            {/*<input*/}
            {/*    type="file"*/}
            {/*    name="myImage"*/}
            {/*    onChange={(event) => {*/}
            {/*        console.log(event.target.files[0]);*/}
            {/*        setSelectedImage(event.target.files[0]);*/}
            {/*    }}*/}
            {/*/>*/}
        </div>
    );
};

export default Settings;