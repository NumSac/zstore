import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { PersonFillGear } from "react-bootstrap-icons";

import { Link } from "react-router-dom";

const Header: React.FC<any> = () => {
	return (
		<Navbar bg="dark" expand="lg" className="navbar-dark" sticky="top">
			<Container>
				<Navbar.Brand>
					<Link style={{ textDecoration: "none" }} className="text-white" to="/">
						zStore
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="header-nav" />
				<Navbar.Collapse id="header-nav" className="h-100">
					<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
						<Nav.Link>Categories</Nav.Link>
						<Nav.Link>Live Stream</Nav.Link>
						<Nav.Link>Special Offers</Nav.Link>
					</Nav>
					<Nav className="d-flex  justify-content-between">
						<Form className="d-flex p-1">
							<Form.Control
								type="search"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
							/>
							<Button variant="warning">Search</Button>
						</Form>

						<Nav.Link as={Link} to="auth" className="ms-4">
							<PersonFillGear size={25} />
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
