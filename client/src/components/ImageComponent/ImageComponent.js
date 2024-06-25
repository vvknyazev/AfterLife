import React, {useEffect, useState} from 'react';
import {Blurhash} from 'react-blurhash';

const ImageComponent = ({src, hash, width, height, alt}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoaded(true);
        }
        img.src = src;
    }, [src])


    const containerStyle = {
        position: 'relative',
        overflow: 'hidden',
        width: width,
        height: height
    };

    return (
            <div style={containerStyle}>
                <Blurhash
                    hash={hash}
                    width={width}
                    height={height}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    style={{
                        opacity: imageLoaded ? 0 : 1 ,
                        transition: 'opacity 0.5s ease'
                    }}
                />
                <img
                    src={src}
                    alt={alt}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: imageLoaded ? 1 : 0 ,
                        transition: 'opacity 0.5s ease',
                        width: '100%',
                        height: '100%',
                        objectFit: "cover"
                    }}
                />
            </div>
    );
};

export default ImageComponent;
