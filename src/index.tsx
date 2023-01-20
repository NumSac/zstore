import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Auth from "./pages/Auth";
import { store } from "./redux/store";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "auth",
				element: <Auth />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={routes} />
		</Provider>
	</React.StrictMode>
);
