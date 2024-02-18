import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, image }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" src={image} alt="recognised faces" width="500px" height="auto"></img>
                <div className="bounding-box"></div>
            </div>
        </div>
    );
};

export default FaceRecognition;