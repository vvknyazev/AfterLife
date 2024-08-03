import React from 'react';
import s from "../../../pages/Profile.module.css";
import ImageComponent from "../../ImageComponent/ImageComponent";

const Music = () => {
    return (
        <div>
            <div className={s.categoryContent}>
                <div className={s.categoryContentItem}>
                    <ImageComponent hash={'LCI|m+0202~A01tk-:^NIADjWAkX'} width={'3.333vw'} height={'4.42vw'}  src="/profile/spotlight/music/music1.jpg" alt="music1"/>
                    <div>
                        <p>Måneskin</p>
                        <h4>HONEY (ARE U COMING?)</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <ImageComponent hash={'LRLqe9t7_3xufQj[j[ay~qj[9Fay'} width={'3.333vw'} height={'4.42vw'}  src="/profile/spotlight/music/music2.jpg" alt="music2"/>
                    <div>
                        <p>Ethan Bortnick</p>
                        <h4>engravings</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <ImageComponent hash={'LzM7W3tl~qxax^Vsxuozn#M{ofs;'} width={'3.333vw'} height={'4.42vw'}  src="/profile/spotlight/music/music3.webp" alt="music3"/>
                    <div>
                        <p>TK from Ling tosite sigure</p>
                        <h4>first death</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <ImageComponent hash={'L4KBRD0000Mx00t6~pNG00%M%M%M'} width={'3.333vw'} height={'4.42vw'}  src="/profile/spotlight/music/music4.webp" alt="music4"/>
                    <div>
                        <p>XXXTENTACION</p>
                        <h4>Everybody Dies In Their Nightmares</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Music;
