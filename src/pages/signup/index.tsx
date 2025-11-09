import { useState } from "react";
import { OtpVerification } from "./otp-verification";
import { Register } from "./register";

export function Signup() {
  const [isOtpPage, setIsOtpPage] = useState(false);

  return (
    <div className="flex items-center justify-center  p-4">
      <div className="w-full max-w-md">
        {isOtpPage ? (
          <OtpVerification />
        ) : (
          <Register registrationSuccess={() => setIsOtpPage(true)} />
        )}
      </div>
    </div>
  );
}
