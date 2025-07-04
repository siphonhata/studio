'use client';
import type { Parcel, ParcelStatus } from '@/lib/types';
import { mockParcels } from '@/lib/mock-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const statusColors: { [key in ParcelStatus]: string } = {
    Ordered: 'bg-gray-500',
    Dispatched: 'bg-blue-500',
    'In-Transit': 'bg-blue-500',
    'Out-for-Delivery': 'bg-yellow-500',
    Delivered: 'bg-green-500',
    Canceled: 'bg-red-500',
};

// For demo purposes, we'll assign some parcels to the customer
const customerParcels = mockParcels.slice(0, 2);

export default function CustomerDashboard() {
  
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerParcels.length}</div>
            <p className="text-xs text-muted-foreground">
              All your shipments with ParcelVibe
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerParcels.filter(p => p.status === 'In-Transit' || p.status === 'Dispatched' || p.status === 'Out-for-Delivery').length}</div>
             <p className="text-xs text-muted-foreground">
              Parcels on their way to you
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold font-headline mb-4">My Parcels</h2>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerParcels.map(parcel => (
              <TableRow key={parcel.id}>
                <TableCell className="font-medium">{parcel.trackingId}</TableCell>
                <TableCell>{parcel.sender.name}</TableCell>
                <TableCell>
                    <Badge variant="secondary" className={`text-white ${statusColors[parcel.status]}`}>
                        {parcel.status}
                    </Badge>
                </TableCell>
                <TableCell>
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/track?id=${parcel.trackingId}`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
