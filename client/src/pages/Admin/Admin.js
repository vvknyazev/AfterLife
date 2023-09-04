import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import s from "./Admin.module.css";
import {useGetFullModelsQuery} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";

const Admin = () => {
    // const [user, oauthUser] = useOutletContext();
    // const [photoURL, setPhotoURL] = useState(null);

    const navigate = useNavigate();

    const {data: fullModels, isLoading: isLoadingFullModels, isSuccess: isSuccessFullModels} = useGetFullModelsQuery();

    if (isLoadingFullModels) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }

    if (isSuccessFullModels) {
        console.log("full: ", fullModels);
    }
    function handleModelChange(id){
        navigate('/admin/model/' + id);
    }
    const modelsTable = fullModels.map(el => <tr key={el._id}>
        <td>{el._id}</td>
        <td>{el.name}</td>
        <td>{el.bio}</td>
        <td>{el.email}</td>
        <td><img src={`${process.env.REACT_APP_API_URL}/${el.photo}`} alt="model"/></td>
        <td>
            <button onClick={() => handleModelChange(el._id)}>Change</button>
        </td>
    </tr>)
    return (
        <div className={s.container}>
            <NavLink to={'/admin/model/create'} className={`${s.createModelButton} ${s.topRight}`}>Create Model</NavLink>
            <h1>Welcome to the Admin Panel</h1>
            <br/>
            <table className={s.modelsTable}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Bio</th>
                    <th>Email</th>
                    <th>Photo</th>
                </tr>
                </thead>
                <tbody>
                {modelsTable}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;