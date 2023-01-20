import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../services/firebase";
import { ISignup, SIGNUP_DEFAULT_DATA } from "../types/auth-types";

const Signup = () => {
	const [data, setData] = useState<ISignup>(SIGNUP_DEFAULT_DATA);
	const { displayName, email, password, confirmPassword } = data;

	const resetFormFields = (): void => setData(SIGNUP_DEFAULT_DATA);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("passwords do not match");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(data);

			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (err: any) {
			if (err.code === "auth/email-already-in-use") {
				alert("Cannot create user, email already in use");
			} else {
				console.log("user creation encountered an error", err);
			}
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setData({ ...data, [name]: value });
	};

	return (
		<Card>
			<Card.Title className="text-center p-2 display-6">Signup</Card.Title>
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control
							onChange={handleChange}
							name="displayName"
							type="text"
							value={displayName}
							placeholder="Enter Username"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control
							onChange={handleChange}
							name="email"
							type="email"
							value={email}
							placeholder="Enter email"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							onChange={handleChange}
							name="password"
							type="password"
							value={password}
							placeholder="Enter password"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							onChange={handleChange}
							name="confirmPassword"
							type="password"
							value={confirmPassword}
							placeholder="Reenter password"
						/>
					</Form.Group>
					<Button className="w-100 mt-3" variant="warning" type="submit">
						Signup
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default Signup;
