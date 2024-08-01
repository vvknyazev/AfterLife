import React, {useEffect, useRef, useState} from 'react';
import s from './SearchModal.module.css'
import {useSelector} from "react-redux";
import Category from "../Categories/Category/Category";
import {SwiperSlide} from "swiper/react";
import {useGetModelsQuery, useGetSearchModelsQuery} from "../../features/commonApiSlice";
import SearchItem from "./SearchItem/SearchItem";
import {ThreeDots} from "react-loader-spinner";

const SearchModal = ({isModalOpen, closeModal}) => {
    const [query, setQuery] = useState("");

    const games = useSelector((state) => state.games);

    const {data: models, isLoading: isLoadingModels} = useGetModelsQuery();

    const {data: searchResults, isLoading: isLoadingSearchResults} = useGetSearchModelsQuery(query);

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
                    <input type="text" onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
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
                        {!isLoadingSearchResults ?
                            searchResults?.map((e) => (
                                    <SearchItem img={`${process.env.REACT_APP_API_URL}/${e.photo}`} name={e.name}
                                                desc={e.bio} games={e.games}
                                                username={e.username}
                                                key={e._id} id={e._id}/>
                                )
                            )
                            :
                            <div className={s.loading}>
                                <ThreeDots width='50' color="#fff"/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
