import {useState, useEffect} from 'react';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {registrationService} from '@/api/registration.service';
import {setSessionToken} from '@/lib/session';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const formSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 characters').max(6, 'OTP must be 6 characters'),
});

export function OtpVerification({
  otpVerificationSuccess,
}: {
  otpVerificationSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [availableTries, setAvailableTries] = useState(3);
  const [showResendButton, setShowResendButton] = useState(true);
  const [lastResendTime, setLastResendTime] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResendButton(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [lastResendTime]);

  const handleResendClick = () => {
    registrationService.sendVerificationEmail();
    setAvailableTries(availableTries - 1);
    setLastResendTime(Date.now());
    setShowResendButton(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  async function onSubmit({otp}: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await registrationService.validateEmailOTP({
      otp,
    });
    setIsLoading(false);

    if (!response.ok) {
      form.setError('root', {
        message: response.data?.message || 'Something went wrong',
      });
      return;
    }

    setSessionToken(response.data.token);
    otpVerificationSuccess();
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Verify your email</CardTitle>
            <CardDescription className="text-center">
              Enter the OTP sent to your email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter 6-digit OTP" {...field} />
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
                <Button type="submit" className="w-full" loading={isLoading}>
                  Verify
                </Button>
                <div className="text-center text-sm">
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    disabled={!showResendButton || availableTries <= 0}
                    onClick={handleResendClick}
                  >
                    {availableTries > 0
                      ? showResendButton
                        ? 'Resend OTP'
                        : 'Resend available in 30s'
                      : 'No more resend attempts'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
