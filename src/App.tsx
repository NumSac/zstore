import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "./partials/Footer";
import Header from "./partials/Header";

function App() {
	return (
		<div>
			<Header />
			<Container>
				<Outlet />
			</Container>
			<Footer />
		</div>
	);
}

export default App;
