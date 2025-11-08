import { HomeRoutes } from "@/routes/home.route";

export function HomeLayout() {
	return (
		<div className="flex flex-col min-h-screen bg-background text-foreground">
			<main className="flex-1 container mx-auto py-8">
				<HomeRoutes />
			</main>
		</div>
	);
}
