import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "@/layouts/home.layout";

export function RootRoutes() {
	return (
		<Routes>
			<Route path="/*" element={<HomeLayout />}></Route>
		</Routes>
	);
}
