import React from "react";
import { Col, Row } from "react-bootstrap";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

const Auth: React.FC<any> = () => {
	return (
		<>
			<Row className="mt-5">
				<Col xs={12} md={6}>
					<Signin />
				</Col>
				<Col xs={12} md={6}>
					<Signup />
				</Col>
			</Row>
		</>
	);
};

export default Auth;
