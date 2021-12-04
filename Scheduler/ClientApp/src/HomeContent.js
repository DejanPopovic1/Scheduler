import React from 'react';
import './login.css';
import backgroundPic from './Resources/HomePage.jpg';

const HomeContent = () => {
    return (
        <>
            <img class='bg' src={backgroundPic} />
            <div class='justify standardBackgroundColour'>
                <h2 class="centeredRow whiteSpace">Scheduler Instructions</h2>
                <p>As a user requesting pickup, go to the 'Schedule' tab and complete the pickup instructions</p>
                <p>As a super user wanting to see the resource requirements to fulfill all pickup requests, go to the 'Scheduler Tool' tab and complete the pickup instructions</p>
                <p>A super user may also set the location for the central location hub through which resources are located</p>
                <br />
            </div>
        </>
    );
};

export default HomeContent;