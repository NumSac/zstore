import { appApi } from "../appApi";

const productApi = appApi.injectEndpoints({
	endpoints: (builder) => ({}),
	overrideExisting: false,
});
