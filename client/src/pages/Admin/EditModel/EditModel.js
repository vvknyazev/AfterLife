import React from 'react';
import {useParams} from "react-router-dom";
import {useGetFullOneQuery} from "../../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";

const EditModel = () => {
    const {modelId} = useParams();
    console.log("modelId: ", modelId);

    const { data: model, isLoading, isSuccess} = useGetFullOneQuery(modelId);

    if (isLoading) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>;
    }
    if (isSuccess){
        console.log("model: ", model);
    }
    return (
        <div>
            {model.email}
        </div>
    );
};

export default EditModel;