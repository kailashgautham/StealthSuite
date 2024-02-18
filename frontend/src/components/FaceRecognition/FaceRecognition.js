import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ boxes, image }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                {console.log(boxes.length)}
                <img id="inputimage" src={image} alt="recognised faces" width="500px" height="auto"></img>
                {
                    boxes.map((box, idx) =>
                    (<div
                        id = {idx}
                        className="bounding-box"
                        style={{
                            top: `${box.topRow}px`,
                            right: `${box.rightCol}px`,
                            bottom: `${box.bottomRow}px`,
                            left: `${box.leftCol}px`
                        }}>
                    </div>)
                    )
                }
                {/* <div className="bounding-box" style={{top: `${box.topRow}px`, right: `${box.rightCol}px`, bottom: `${box.bottomRow}px`, left: `${box.leftCol}px`}}></div> */}
            </div>
        </div>
    );
};

export default FaceRecognition;