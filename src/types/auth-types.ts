export interface Login {
	email: string;
	password: string;
}

export const LOGIN_DEFAULT_DATA: Login = {
	email: "",
	password: "",
};

export interface ISignup {
	displayName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const SIGNUP_DEFAULT_DATA: ISignup = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export interface User {
	email: string | null;
	displayName: string | null;
	photoUrl: string | null;
	uid: string | null;
	createdAt: string | null;
}

export const USER_DEFAULT_STATE: User = {
	email: null,
	displayName: null,
	photoUrl: null,
	uid: null,
	createdAt: null,
};
