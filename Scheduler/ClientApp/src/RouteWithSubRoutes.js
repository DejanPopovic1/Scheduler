import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const RouteWithSubRoutes = (route) => {
	return (
		<Route
			path={route.path}
			render={(props) => (
				<route.component {...props} routes={route.routes} />
			)}
		/>
	);
};

export default RouteWithSubRoutes;
