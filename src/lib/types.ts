export type ParcelStatus = "Ordered" | "Dispatched" | "In-Transit" | "Out-for-Delivery" | "Delivered" | "Canceled";

export interface ParcelEvent {
  id: string;
  status: ParcelStatus;
  location: string;
  timestamp: string;
}

export interface Parcel {
  id: string;
  trackingId: string;
  sender: {
    name: string;
    address: string;
  };
  recipient: {
    name: string;
    address: string;
  };
  status: ParcelStatus;
  history: ParcelEvent[];
  currentLocation: {
    lat: number;
    lng: number;
  };
}
