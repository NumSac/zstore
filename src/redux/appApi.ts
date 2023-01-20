import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { FirebaseError } from "firebase/app";

const baseQuery = fakeBaseQuery<FirebaseError>();

export const appApi = createApi({
	baseQuery,
	tagTypes: ["Categories", "Cart", "Products"],
	endpoints: () => ({}),
});
