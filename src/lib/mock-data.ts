import type { Parcel } from './types';

export const mockParcels: Parcel[] = [
  {
    id: '1',
    trackingId: 'PV123456789',
    sender: { name: 'SA Gadgets', address: '100 Main Road, Johannesburg' },
    recipient: { name: 'John Doe', address: '12 Long Street, Cape Town' },
    status: 'In-Transit',
    currentLocation: { lat: -29.1194, lng: 26.2248 },
    history: [
      { id: 'h1', status: 'Ordered', location: 'Sender Warehouse, Johannesburg', timestamp: '2024-07-28T10:00:00Z' },
      { id: 'h2', status: 'Dispatched', location: 'Johannesburg, GP', timestamp: '2024-07-28T18:00:00Z' },
      { id: 'h3', status: 'In-Transit', location: 'En route to Cape Town, near Bloemfontein', timestamp: '2024-07-29T08:00:00Z' },
    ],
  },
  {
    id: '2',
    trackingId: 'PV987654321',
    sender: { name: 'Durban Fashion', address: '1 Beachfront, Durban' },
    recipient: { name: 'Jane Smith', address: '55 Church Street, Pretoria' },
    status: 'Delivered',
    currentLocation: { lat: -25.7479, lng: 28.2293 },
    history: [
      { id: 'h4', status: 'Ordered', location: 'Sender Boutique, Durban', timestamp: '2024-07-25T14:00:00Z' },
      { id: 'h5', status: 'Dispatched', location: 'Durban, KZN', timestamp: '2024-07-25T20:00:00Z' },
      { id: 'h6', status: 'In-Transit', location: 'Local distribution center, Pretoria', timestamp: '2024-07-26T09:00:00Z' },
      { id: 'h7', status: 'Out-for-Delivery', location: 'Out with courier, Pretoria', timestamp: '2024-07-27T11:00:00Z' },
      { id: 'h8', status: 'Delivered', location: 'Recipient Address, Pretoria', timestamp: '2024-07-27T15:30:00Z' },
    ],
  },
  {
    id: '3',
    trackingId: 'PV112233445',
    sender: { name: 'Book Nook', address: '1 Govan Mbeki Ave, Gqeberha' },
    recipient: { name: 'Peter Jones', address: '2 Summerstrand Blvd, Gqeberha' },
    status: 'Canceled',
    currentLocation: { lat: -33.9608, lng: 25.6022 },
    history: [
      { id: 'h9', status: 'Ordered', location: 'Bookstore, Gqeberha', timestamp: '2024-07-29T11:00:00Z' },
      { id: 'h10', status: 'Canceled', location: 'Order canceled by customer', timestamp: '2024-07-29T12:00:00Z' },
    ],
  },
];
