'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Truck,
  MapPin,
  Home,
  CheckCircle2,
  XCircle,
  Search,
  ChevronRight,
} from 'lucide-react';

import type { Parcel, ParcelEvent, ParcelStatus } from '@/lib/types';
import { mockParcels } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/logo';

const statusIcons: { [key in ParcelStatus]: React.ElementType } = {
  Ordered: Package,
  Dispatched: Truck,
  'In-Transit': Truck,
  'Out-for-Delivery': Home,
  Delivered: CheckCircle2,
  Canceled: XCircle,
};

const statusColors: { [key in ParcelStatus]: string } = {
  Ordered: 'bg-gray-500',
  Dispatched: 'bg-blue-500',
  'In-Transit': 'bg-blue-500',
  'Out-for-Delivery': 'bg-yellow-500',
  Delivered: 'bg-green-500',
  Canceled: 'bg-red-500',
};

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState('');
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const foundParcel = mockParcels.find((p) => p.trackingId.toLowerCase() === trackingId.toLowerCase());
    if (foundParcel) {
      setParcel(foundParcel);
    } else {
      setParcel(null);
      setError('Parcel not found. Please check the tracking ID and try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="p-4 border-b flex justify-between items-center">
        <Logo />
        <Button variant="outline" asChild>
          <Link href="/admin/login">Admin Portal</Link>
        </Button>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Track Your Parcel</CardTitle>
              <CardDescription>Enter your tracking ID to see the latest updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="e.g., PV123456789"
                  className="flex-grow"
                  aria-label="Tracking ID"
                />
                <Button type="submit" size="icon" aria-label="Search">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-red-600 mb-8 p-4 bg-red-100 border border-red-200 rounded-md"
              >
                {error}
              </motion.div>
            )}
            {parcel && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-headline text-3xl">Tracking ID: {parcel.trackingId}</CardTitle>
                        <CardDescription>From: {parcel.sender.name} To: {parcel.recipient.name}</CardDescription>
                      </div>
                      <Badge variant={parcel.status === 'Delivered' ? 'default' : 'secondary'} className={`text-white ${statusColors[parcel.status]}`}>
                        {parcel.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold mb-4 text-lg">Delivery Timeline</h3>
                      <div className="relative pl-4">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
                        {parcel.history.map((event, index) => {
                          const Icon = statusIcons[event.status];
                          const color = statusColors[event.status];
                          return (
                            <motion.div 
                              key={event.id} 
                              className="flex items-start gap-4 mb-6"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="mt-1">
                                <p className="font-semibold">{event.status}</p>
                                <p className="text-sm text-muted-foreground">{event.location}</p>
                                <p className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold mb-4 text-lg">Live Location</h3>
                      <div className="aspect-video rounded-lg overflow-hidden border">
                        <Image
                          src="https://placehold.co/600x400/F0F8FF/29ABE2?text=Map+Placeholder"
                          alt="Map showing parcel location"
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                          data-ai-hint="world map"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Current Location: Near {parcel.history[parcel.history.length-1].location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
