import React from 'react';
import s from "../../../pages/Profile.module.css";
import ImageComponent from "../../ImageComponent/ImageComponent";

const Games = () => {
    return (
        <div>
            <div className={s.categoryContent}>
                <div className={s.categoryContentItem}>
                    <ImageComponent hash={'LiHT$+o0NHWB~TkCNHWC-.oLM}WV'} width={'64px'} height={'85px'}  src="/profile/activity/dota2.png" alt="dota2"/>
                    <div>
                        <h4>Dota 2</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <ImageComponent hash={'L371fuV?0Lxv^$j?JDofZyNG-=V?'} width={'64px'} height={'85px'}  src="/profile/activity/aoe.png" alt="aoe"/>
                    <div>
                        <h4>AOE 4</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <ImageComponent hash={'LJL-s{0%0kEj}nEj$$NI^3WXs-Nd'} width={'64px'} height={'85px'}  src="/profile/activity/cs2.png" alt="cs2"/>
                    <div>
                        <h4>CS 2</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <ImageComponent hash={'LSI}#D%MxVNH%jkCRoaxK8RPIpjF'} width={'64px'} height={'85px'}  src="/profile/activity/genshin.png" alt="genshin"/>
                    <div>
                        <h4>Genshin Impact</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Games;