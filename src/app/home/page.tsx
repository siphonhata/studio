import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserCog } from 'lucide-react';
import Logo from '@/components/logo';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-primary font-headline">
            Welcome to ParcelVibe
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            Your friendly, modern solution for tracking parcels from dispatch to delivery.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-2xl font-headline">
                  <ArrowRight className="text-primary" />
                  Track Your Parcel
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4 text-muted-foreground">
                  Have a tracking code? Check the status of your delivery now.
                </p>
                <Button asChild size="lg" className="w-full">
                  <Link href="/track">Start Tracking</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-2xl font-headline">
                  <UserCog className="text-primary" />
                  Admin Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4 text-muted-foreground">
                  Manage orders, update statuses, and oversee deliveries.
                </p>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link href="/admin/login">Admin Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
