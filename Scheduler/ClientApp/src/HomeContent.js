import React from 'react';
import './login.css';
import backgroundPic from './Resources/HomePage.jpg';

const HomeContent = () => {
	return (
		<>
			<img class='bg' src={backgroundPic}/>
			<div class='justify standardBackgroundColour'>

				<h2 class="centeredRow whiteSpace">Pickup App Instructions</h2>
				<p>To schedule a pickup, go to the 'Schedule' tab and provide the instructions for pickup</p>
				<p>Within the schedule tab, multiple pickups may be arranged</p>
				<p>Ensure you have the relevant information available, including:
					<ul>
							<li>Date of pickup</li>
							<li>Pickup point - this may be input through a map pin drop</li>
					</ul>
				</p>
				<br />
			</div>
		</>
	);
};

export default HomeContent;