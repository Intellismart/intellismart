'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';

export default function VerifyEmailPage() {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState('user@example.com'); // This would come from the registration flow
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const newCode = pasteData.split('').slice(0, 6);
      setCode([...newCode, ...Array(6 - newCode.length).fill('')]);
      
      // Auto-submit if code is complete
      if (newCode.length === 6) {
        handleVerify();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) return;
    
    setIsLoading(true);
    
    // TODO: Implement actual verification
    console.log('Verify code:', verificationCode);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to dashboard after successful verification
    router.push('/dashboard');
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsResending(true);
    
    // TODO: Implement actual resend code
    console.log('Resend code to:', email);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    alert('Verification code has been resent to your email.');
    setIsResending(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Icons.mail className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">Check your email</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We've sent a verification code to <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>
        
        <div className="rounded-lg bg-background p-8 shadow-sm">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="verification-code">Verification code</Label>
              <div className="flex items-center justify-between space-x-2">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="h-14 text-center text-xl font-mono"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Enter the 6-digit code sent to your email
              </p>
            </div>
            
            <Button 
              type="button" 
              className="w-full" 
              onClick={handleVerify}
              disabled={isLoading || code.some(digit => !digit)}
            >
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Verify email
            </Button>
            
            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Didn't receive a code?{' '}
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="font-medium text-primary hover:underline focus:outline-none"
                >
                  {isResending ? 'Sending...' : 'Resend code'}
                </button>
              </p>
              
              <p className="mt-2 text-muted-foreground">
                Or{' '}
                <Link 
                  href="/auth/login" 
                  className="font-medium text-primary hover:underline"
                >
                  sign in to a different account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
