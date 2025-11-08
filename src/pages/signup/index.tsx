import { useState } from "react";
import { useLoginRedirect } from "@/hooks/useLoginRedirect";
import { OtpVerification } from "./otp-verification";
import { Register } from "./register";

export function Signup() {
	const [isOtpPage, setIsOtpPage] = useState(false);
	const redirectAfterLogin = useLoginRedirect();

	const verificationSuccess = () => {
		redirectAfterLogin();
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<div className="w-full max-w-md">
				{isOtpPage ? (
					<OtpVerification otpVerificationSuccess={verificationSuccess} />
				) : (
					<Register registrationSuccess={() => setIsOtpPage(true)} />
				)}
			</div>
		</div>
	);
}
