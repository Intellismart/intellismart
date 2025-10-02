'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // TODO: Implement actual password reset request
    console.log('Reset password for:', email);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEmailSent(true);
    setIsLoading(false);
  };

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Icons.check className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">Check your email</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              The link will expire in 1 hour.
            </p>
          </div>
          
          <div className="rounded-lg bg-background p-8 shadow-sm">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive an email? Check your spam folder or{' '}
                <button
                  type="button"
                  onClick={() => setEmailSent(false)}
                  className="font-medium text-primary hover:underline"
                >
                  try another email address
                </button>
              </p>
              
              <Button 
                type="button" 
                variant="outline" 
                className="mt-6 w-full"
                onClick={() => router.push('/auth/login')}
              >
                Back to sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Forgot your password?</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>
        
        <div className="rounded-lg bg-background p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading || !email}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Send reset link
            </Button>
            
            <div className="text-center text-sm">
              <Link 
                href="/auth/login" 
                className="font-medium text-primary hover:underline"
              >
                Back to sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
