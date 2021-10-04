import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const RouteWithSubRoutes = (props) => {
	return (
		//<Route path={props.path} render={(props2) => (<props.component {...props2} />)} />
		<Route path={props.path} component={props.component} />
	);
};

export default RouteWithSubRoutes;
