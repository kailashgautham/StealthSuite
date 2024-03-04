import React from 'react';

const Navigation = ({ onRouteChange, currentRoute }) => {
    return (
        currentRoute === "home" ?
            (
                <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                    <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange("signin")}>Sign Out</p>
                </nav>
            ) : currentRoute === "signin" ?
                (
                    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                        <p className='f3 link dim black underline pa3'> </p>
                    </nav>
                )
                : (
                    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                        <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange("signin")}>Sign In</p>
                    </nav>
                )
    )
};

export default Navigation;