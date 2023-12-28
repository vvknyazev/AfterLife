import React, {useEffect, useRef, useState} from 'react';
import s from './Player.module.css';
import Wavesurfer from "wavesurfer.js";
const Player = () => {
    const waveform = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!waveform.current) {
            waveform.current = Wavesurfer.create({
                container: '#waveform',
                waveColor: '#ffffff',
                barGap: 4,
                barMinHeight: 1,
                barWidth: 4,
                barRadius: 3,
                cursorColor: '#ffffff',
                interact: false,
                cursorWidth: 0,
                fillParent: true,
                minPxPerSec: 50,
            });
            waveform.current.on('finish', () => {
                setIsPlaying(false);
            });

            waveform.current.load('/profile/voice.mp3');
        }

    }, []);

    const playAudio = () => {
        setIsPlaying(!isPlaying);
        if (waveform.current.isPlaying()) {
            waveform.current.pause();
        } else {
            waveform.current.play();
        }
    };

    return (
        <div className={s.player}>
            <div id="waveform" className={s.waveform} />
            <button className={s.button} onClick={playAudio}>
                { isPlaying ?
                    <img src="/profile/player/pause-button.svg" alt="pause-button" />
                    :
                    <img src="/profile/player/play-button.svg" alt="play-button" />
                }

            </button>
        </div>
    );
};

export default Player;
