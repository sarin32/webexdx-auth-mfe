import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { registrationService } from "@/api/registration.service";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setSessionToken } from "@/lib/session";

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	emailId: z.string().email("Please enter a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export function Register({
	registrationSuccess,
}: {
	registrationSuccess: () => void;
}) {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const passwordToggle = () => {
		setShowPassword(!showPassword);
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			emailId: "",
			password: "",
			name: "",
			confirmPassword: "",
		},
	});

	async function onSubmit({
		emailId,
		name,
		password,
		confirmPassword,
	}: z.infer<typeof formSchema>) {
		if (confirmPassword !== password) {
			form.setError("confirmPassword", { message: "Passwords do not match" });
			form.setError("password", { message: "Passwords do not match" });
			return;
		}

		setIsLoading(true);
		const response = await registrationService.register({
			name,
			email: emailId,
			password,
		});
		setIsLoading(false);

		if (!response.ok) {
			form.setError("root", {
				message: response.data?.message || "Something went wrong",
			});
			return;
		}
		setSessionToken(response.data.token);
		registrationService.sendVerificationEmail();
		registrationSuccess();
	}

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						Create an account
					</CardTitle>
					<CardDescription className="text-center">
						Enter your details to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Enter your name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="emailId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Enter your email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="Enter your password"
													{...field}
												/>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
													onClick={passwordToggle}
												>
													{showPassword ? "Hide" : "Show"}
												</Button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Confirm your password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{form.formState.errors.root && (
								<p className="text-sm font-medium text-destructive">
									{form.formState.errors.root.message}
								</p>
							)}
							<Button type="submit" className="w-full" disabled={isLoading}>
								Sign Up
							</Button>
							<div className="text-center text-sm">
								Already have an account?{" "}
								<Button
									variant="link"
									className="p-0 h-auto"
									onClick={() => navigate("/login")}
								>
									Sign in
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
