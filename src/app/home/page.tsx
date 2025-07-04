'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ShieldCheck, Briefcase } from 'lucide-react';
import Logo from '@/components/logo';

export default function HomePage() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId) {
      router.push(`/track?id=${trackingId}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Logo />
          <nav className="ml-auto flex items-center gap-2 md:gap-4">
            <Button variant="ghost" asChild>
              <Link href="/track">Track</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/customer/login">Customer Login</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/login">Admin Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32 text-center">
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold text-primary font-headline">
              Your Delivery's Journey, Visualized.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              ParcelVibe offers a seamless, real-time tracking experience from our warehouse to your doorstep.
            </p>
            <form onSubmit={handleTrack} className="mt-8 max-w-lg mx-auto flex items-center gap-2">
              <Input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your tracking ID..."
                className="flex-grow text-lg h-12"
                aria-label="Tracking ID"
              />
              <Button type="submit" size="lg" className="h-12">
                <Search className="mr-2 h-5 w-5" />
                Track
              </Button>
            </form>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline">Why Choose ParcelVibe?</h2>
                <p className="mt-2 text-muted-foreground">The ultimate solution for modern parcel management.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <MapPin className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Real-Time Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Watch your parcel's journey live on the map, with up-to-the-minute location updates.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Briefcase className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Business-Ready Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Powerful admin dashboard to manage orders, drivers, and delivery statuses effortlessly.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Secure & Reliable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your parcels are handled with care, with a transparent and secure delivery process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t">
        <div className="container py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ParcelVibe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
