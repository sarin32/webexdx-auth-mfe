import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {OtpVerification} from './otp-verification';
import {Register} from './register';

export function Signup() {
  const [isOtpPage, setIsOtpPage] = useState(false);
  const navigate = useNavigate();

  const verificationSuccess = () => {
    navigate('/dashboard');
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
