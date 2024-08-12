import React, {useState} from 'react';
import Nav from "../../components/Nav/Nav";
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import s from "./Models.module.css";
import Categories from "../../components/Categories/Categories";
import GirlsSection from "../Main/GirlsSection/GirlsSection";
import {useGetModelsQuery} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import Card from "../../components/Card/Card";

const Models = () => {
    const [user] = useOutletContext();

    const [currentItems, setCurrentItems] = useState([]);

    const {data: models, isLoading: isLoadingModels} = useGetModelsQuery();

    const [selectedCategory, setSelectedCategory] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    // function chooseCategory(category) {
    //     setCurrentItems(models.filter(el => el.games.includes(category)))
    //     setSelectedCategory(category);
    //     if (isHomePage) {
    //         navigate('/hosts')
    //     }
    // }

    if (isLoadingModels) {
        return <div>
            <Nav user={user}/>
            <div className={'loader'}>
                <InfinitySpin
                    width='200'
                    color="#000"
                />
            </div>
        </div>
    }
    console.log("models: ", models);

    return (
        <div style={{background: "#000"}}>
            <Nav user={user}/>
            <section className={s.models}>
                <div className={s.filters}>

                </div>
                <div className={s.contentModels}>
                    {models.map((e)=>(
                        <Card img={`${process.env.REACT_APP_API_URL}/${e.photo}`} name={e.name}
                              desc={e.bio} games={e.games}
                              key={e._id} id={e._id}
                        />
                    ))}
                </div>



                {/*<Categories chooseCategory={chooseCategory} selectedCategory={selectedCategory}/>*/}
                {/*<GirlsSection girlsCategory={currentItems} models={models}/>*/}
            </section>
        </div>
    );
};

export default Models;
