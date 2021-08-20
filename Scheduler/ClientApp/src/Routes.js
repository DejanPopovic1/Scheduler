import React from 'react';
import Home from './Home';
import Login from './login';
import Schedule from './Schedule';
import Contact from './Contact';

const routes = [
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/home',
		component: Home,
		routes: [
			{
				path: '/home/schedule',
				component: Schedule,
			},
			{
				path: '/home/contact',
				component: Contact,
			},
		],
	},
];

export default routes;
