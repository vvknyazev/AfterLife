import React, {useEffect, useRef} from 'react';
import s from './SearchModal.module.css'
import {useSelector} from "react-redux";
import Category from "../Categories/Category/Category";
import {SwiperSlide} from "swiper/react";
import {useGetModelsQuery} from "../../features/commonApiSlice";
import SearchItem from "./SearchItem/SearchItem";

const SearchModal = ({isModalOpen, closeModal}) => {

    const games = useSelector((state) => state.games);
    const {data: models, isLoading: isLoadingModels} = useGetModelsQuery();

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add(s.noScroll);
        } else {
            document.body.classList.remove(s.noScroll);
        }

        return () => {
            document.body.classList.remove(s.noScroll);
        };
    }, [isModalOpen]);

    const handleClickOutside = (e) => {
        if (e.target.classList.contains(s.background)) {
            closeModal();
        }
    };
    if (isLoadingModels) return <></>

    if (!isModalOpen) return null;

    return (
        <div className={s.background} onClick={handleClickOutside}>
            <div className={s.container}>
                <label className={s.searchLabel}>
                    <img src="/home/search-mobile.svg" alt="search img"/>
                    <input type="text"/>
                </label>
                <div className={s.games}>
                    {games.map((el) => (
                        <div className={s.game} key={el.id}>
                            <img src={el.img} alt={el.img}/>
                            <p>{el.name}</p>
                        </div>
                    ))}
                </div>
                <div className={s.recommendList}>
                    <p className={s.recHeader}>Рекомендации</p>
                    <div className={s.list}>
                        {models?.slice(0, 5).map((e) => (
                            <SearchItem img={`${process.env.REACT_APP_API_URL}/${e.photo}`} name={e.name}
                                        desc={e.bio} games={e.games}
                                        key={e._id} id={e._id}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
