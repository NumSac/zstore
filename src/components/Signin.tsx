import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Login, LOGIN_DEFAULT_DATA } from "../types/auth-types";

import { Google } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { googleSignin, signinUser } from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store";

const Signin = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [formData, setFormData] = useState<Login>(LOGIN_DEFAULT_DATA);
	const { email, password } = formData;

	const signUpWithGoogle = () => dispatch(googleSignin());

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			// await signInWithAuthUserWithEmailAndPassword(data);
			const response = await dispatch(signinUser(formData)).unwrap();
			if (response) {
				resetFormFields();
			}
		} catch (err: any) {
			switch (err.code) {
				case "auth/wrong-password":
					alert("Incorrect password for email");
					return;
				case "auth/user-not-found":
					alert("no user associated with this email");
					return;
				default:
					console.log(err);
					return;
			}
		}
	};

	const resetFormFields = (): void => setFormData(LOGIN_DEFAULT_DATA);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	return (
		<Card>
			<Card.Title className="text-center p-2 display-6">Login</Card.Title>
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control
							value={email}
							onChange={handleChange}
							name="email"
							type="email"
							placeholder="Enter email"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							value={password}
							onChange={handleChange}
							name="password"
							type="password"
							placeholder="Enter password"
						/>
					</Form.Group>
					<Button className="w-100 mt-3" variant="warning" type="submit">
						Login
					</Button>
					<hr />
					<Button
						className="p-3 justify-content-between align-items-center w-50"
						variant="danger"
						type="submit"
						onClick={signUpWithGoogle}
					>
						Signin with Google
						<Google size={20} className="ms-2" />
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default Signin;
