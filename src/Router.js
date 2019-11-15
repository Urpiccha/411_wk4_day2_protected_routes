import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router";
import cookie from "cookie";
import Home from "./components/Home";
import About from "./components/About";
import Car from "./components/Car";
import Login from "./components/Login";

//Make Auth function

const checkAuth = () => {
	const cookies = cookie.parse(document.cookie);
	return cookies["loggedIn"] ? true : false;
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				checkAuth() ? <ProtectedRoute {...rest} /> : <Redirect to="/login" />
			}
		/>
	);
};

const Router = () => {
	return (
		<Switch>
			<Route path="/login" component={Login} />
			<Route exact path="/" component={Home} />
			<ProtectedRoute path="/about" component={About} />
			<ProtectedRoute path="/car/:id" component={Car} />
		</Switch>
	);
};

export default Router;
