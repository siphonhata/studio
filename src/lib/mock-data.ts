import type { Parcel } from './types';

export const mockParcels: Parcel[] = [
  {
    id: '1',
    trackingId: 'PV123456789',
    sender: { name: 'Gadget Corp', address: '123 Tech Lane, Silicon Valley' },
    recipient: { name: 'John Doe', address: '456 Home St, Anytown' },
    status: 'In-Transit',
    currentLocation: { lat: 34.0522, lng: -118.2437 },
    history: [
      { id: 'h1', status: 'Ordered', location: 'Sender Warehouse', timestamp: '2024-07-28T10:00:00Z' },
      { id: 'h2', status: 'Dispatched', location: 'Los Angeles, CA', timestamp: '2024-07-28T18:00:00Z' },
      { id: 'h3', status: 'In-Transit', location: 'En route to destination', timestamp: '2024-07-29T08:00:00Z' },
    ],
  },
  {
    id: '2',
    trackingId: 'PV987654321',
    sender: { name: 'Fashion Hub', address: '789 Style Ave, New York' },
    recipient: { name: 'Jane Smith', address: '101 Maple Rd, Otherville' },
    status: 'Delivered',
    currentLocation: { lat: 40.7128, lng: -74.0060 },
    history: [
      { id: 'h4', status: 'Ordered', location: 'Sender Boutique', timestamp: '2024-07-25T14:00:00Z' },
      { id: 'h5', status: 'Dispatched', location: 'New York, NY', timestamp: '2024-07-25T20:00:00Z' },
      { id: 'h6', status: 'In-Transit', location: 'Local distribution center', timestamp: '2024-07-26T09:00:00Z' },
      { id: 'h7', status: 'Out-for-Delivery', location: 'Out with courier', timestamp: '2024-07-27T11:00:00Z' },
      { id: 'h8', status: 'Delivered', location: 'Recipient Address', timestamp: '2024-07-27T15:30:00Z' },
    ],
  },
  {
    id: '3',
    trackingId: 'PV112233445',
    sender: { name: 'Bookworm Store', address: '221B Baker St, London' },
    recipient: { name: 'Sherlock Holmes', address: '221B Baker St, London' },
    status: 'Canceled',
    currentLocation: { lat: 51.5238, lng: -0.1586 },
    history: [
      { id: 'h9', status: 'Ordered', location: 'Bookstore', timestamp: '2024-07-29T11:00:00Z' },
      { id: 'h10', status: 'Canceled', location: 'Order canceled by customer', timestamp: '2024-07-29T12:00:00Z' },
    ],
  },
];
