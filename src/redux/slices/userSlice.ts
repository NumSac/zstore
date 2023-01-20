import { AnyAction, AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserCredential } from "firebase/auth";
import {
	createAuthUserWithEmailAndPassword,
	signInWithAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutUser,
} from "../../services/firebase";
import { ISignup, Login, User, USER_DEFAULT_STATE } from "../../types/auth-types";
import { RootState } from "../store";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

function isRejectedAction(action: AnyAction): action is RejectedAction {
	return action.type.endsWith("/rejected");
}

function isPendingAction(action: AnyAction): action is PendingAction {
	return action.type.endsWith("/pending");
}

function serializeUserCredentials(user: UserCredential): User {
	try {
		return {
			email: user.user.email,
			displayName: user.user.displayName,
			photoUrl: user.user.photoURL,
			uid: user.user.uid,
			createdAt: user.user.metadata.creationTime,
		} as User;
	} catch (err: any) {
		throw new Error("User serializing user object: ", err);
	}
}

export const signinUser = createAsyncThunk("user/signinUser", async (authData: Login, thunkApi) => {
	const user = await signInWithAuthUserWithEmailAndPassword(authData);
	if (!user) {
		return thunkApi.rejectWithValue("User signin failed");
	}
	return serializeUserCredentials(user);
});

export const signoutUser = createAsyncThunk("user/signoutUser", async (unknown, thunkApi) => {
	try {
		await signOutUser();
		return;
	} catch (err: any) {
		return thunkApi.rejectWithValue("User signout failed");
	}
});

export const signupUser = createAsyncThunk(
	"user/signupUser",
	async (authData: ISignup, thunkApi) => {
		const user = await createAuthUserWithEmailAndPassword(authData);
		if (!user) {
			return thunkApi.rejectWithValue("User signup failed");
		}
		return serializeUserCredentials(user);
	}
);

export const googleSignin = createAsyncThunk("user/googleSignin", async (unknown, thunkApi) => {
	try {
		const user = await signInWithGooglePopup();
		if (user.user) {
			return serializeUserCredentials(user);
		}
	} catch (err: any) {
		return thunkApi.rejectWithValue(err);
	}
});

const userSlice = createSlice({
	name: "user",
	initialState: USER_DEFAULT_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher<FulfilledAction>(
				(action) => action.type.endsWith("/fulfilled"),
				(state: any, action: any) => {
					state[action.meta.requestId] = "fulfilled";
					state.user = { ...action.payload };
					console.log(action.payload);
				}
			)
			.addMatcher(isPendingAction, (state: any, action) => {
				state[action.meta.requestId] = "pending";
			})
			.addMatcher(isRejectedAction, (state: any, action: any) => {
				state[action.meta.requesId] = "rejected";
			})
			.addDefaultCase((state, action) => {});
	},
});

export default userSlice.reducer;

export const isAuthenticated = (state: RootState) => state.user.uid;
