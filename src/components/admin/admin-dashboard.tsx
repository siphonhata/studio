'use client';
import { useState, useEffect } from 'react';
import type { Parcel, ParcelEvent, ParcelStatus } from '@/lib/types';
import { mockParcels } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

const statusOptions: ParcelStatus[] = ["Ordered", "Dispatched", "In-Transit", "Out-for-Delivery", "Delivered", "Canceled"];

const statusColors: { [key in ParcelStatus]: string } = {
    Ordered: 'bg-gray-500',
    Dispatched: 'bg-blue-500',
    'In-Transit': 'bg-blue-500',
    'Out-for-Delivery': 'bg-yellow-500',
    Delivered: 'bg-green-500',
    Canceled: 'bg-red-500',
};


export default function AdminDashboard() {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingParcel, setEditingParcel] = useState<Parcel | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you would fetch this data from an API.
    // We use mock data for this demo.
    setParcels(mockParcels);
  }, []);

  const handleCreateNew = () => {
    setEditingParcel(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (parcel: Parcel) => {
    setEditingParcel(parcel);
    setIsDialogOpen(true);
  };

  const handleDelete = (parcelId: string) => {
    setParcels(parcels.filter(p => p.id !== parcelId));
    toast({
        title: "Success",
        description: "Parcel deleted successfully.",
        variant: 'default',
    });
  };

  const handleSave = (formData: FormData) => {
    const newParcelData = {
        sender: { name: formData.get('senderName') as string, address: formData.get('senderAddress') as string },
        recipient: { name: formData.get('recipientName') as string, address: formData.get('recipientAddress') as string },
        status: formData.get('status') as ParcelStatus,
    };
  
    if (editingParcel) {
      // Update existing parcel
      const updatedParcels = parcels.map(p =>
        p.id === editingParcel.id ? { ...p, ...newParcelData } : p
      );
      setParcels(updatedParcels);
      toast({ title: "Success", description: "Parcel updated successfully." });
    } else {
      // Create new parcel
      const newParcel: Parcel = {
        id: (parcels.length + 1).toString(),
        trackingId: `PV${Math.floor(100000000 + Math.random() * 900000000)}`,
        ...newParcelData,
        currentLocation: { lat: 0, lng: 0 },
        history: [{ id: `h${Date.now()}`, status: newParcelData.status, location: "Created", timestamp: new Date().toISOString() }],
      };
      setParcels([newParcel, ...parcels]);
      toast({ title: "Success", description: "Parcel created successfully." });
    }
  
    setIsDialogOpen(false);
  };
  
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-headline">All Orders</h2>
        <Button onClick={handleCreateNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Order
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.map(parcel => (
              <TableRow key={parcel.id}>
                <TableCell className="font-medium">{parcel.trackingId}</TableCell>
                <TableCell>{parcel.recipient.name}</TableCell>
                <TableCell>
                    <Badge variant="secondary" className={`text-white ${statusColors[parcel.status]}`}>
                        {parcel.status}
                    </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(parcel)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(parcel.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <form action={handleSave}>
            <DialogHeader>
              <DialogTitle className="font-headline">{editingParcel ? 'Edit Order' : 'Create New Order'}</DialogTitle>
              <DialogDescription>
                {editingParcel ? 'Update the details for this parcel.' : 'Fill in the details to create a new parcel order.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="senderName">Sender Name</Label>
                        <Input id="senderName" name="senderName" defaultValue={editingParcel?.sender.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="senderAddress">Sender Address</Label>
                        <Input id="senderAddress" name="senderAddress" defaultValue={editingParcel?.sender.address} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="recipientName">Recipient Name</Label>
                        <Input id="recipientName" name="recipientName" defaultValue={editingParcel?.recipient.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="recipientAddress">Recipient Address</Label>
                        <Input id="recipientAddress" name="recipientAddress" defaultValue={editingParcel?.recipient.address} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={editingParcel?.status}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
