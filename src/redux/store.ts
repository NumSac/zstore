import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appApi } from "./appApi";
import userSlice from "./slices/userSlice";

const reducers = combineReducers({
	[appApi.reducerPath]: appApi.reducer,
	user: userSlice,
});

export const store = configureStore({
	reducer: reducers,

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
