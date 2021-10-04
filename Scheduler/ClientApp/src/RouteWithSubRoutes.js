import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const RouteWithSubRoutes = (props) => {
	const isAuthenticated = sessionStorage.getItem("token");
	return (
		//<Route path={props.path} render={(props2) => (<props.component {...props2} />)} />
		isAuthenticated ? <Route path={props.path} component={props.component} /> : <Redirect to="/login" />
	);
};

export default RouteWithSubRoutes;
