import { HomeRoutes } from "@/routes/home.route";
import { Navbar } from "@/components/navbar";

export function HomeLayout() {
	return (
		<div className="flex flex-col min-h-screen bg-background text-foreground">
			<header>
				<Navbar />
			</header>
			<main className="flex-1 container mx-auto py-8">
				<HomeRoutes />
			</main>
		</div>
	);
}
