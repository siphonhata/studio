'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/logo';

export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd perform authentication here.
    // For this demo, we'll just redirect to the dashboard.
    router.push('/admin/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-4">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@parcelvibe.com" defaultValue="admin@parcelvibe.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" defaultValue="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Login</Button>
              <Button variant="link" asChild className="p-0">
                <Link href="/home">Back to Home</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
