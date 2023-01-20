import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	User,
	UserCredential,
} from "firebase/auth";
import { doc, getDoc, getFirestore, QueryDocumentSnapshot, setDoc } from "firebase/firestore";
import { ISignup, Login } from "../types/auth-types";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth(app);

export const db = getFirestore(app);

export const signInWithGooglePopup = (): Promise<UserCredential> =>
	signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

export const createUserDocumentFromAuth = async (
	userAuth: any,
	additionalInformation = {}
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;

		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (err: any) {
			console.log("error creating the user", err.message);
		}
	}
	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async ({
	email,
	password,
}: ISignup): Promise<UserCredential> => {
	if (!email || !password) return Promise.reject();

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithAuthUserWithEmailAndPassword = async ({
	email,
	password,
}: Login): Promise<UserCredential | void> => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: () => unknown) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				console.log(unsubscribe);
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
