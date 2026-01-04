
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  category: 'Hair' | 'Skin' | 'Nails' | 'Massage' | 'Makeup';
  description: string;
}

export interface Saloon {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewsCount: number;
  image: string;
  services: Service[];
  ownerId: string;
}

export interface Booking {
  id: string;
  saloonId: string;
  saloonName: string;
  serviceId: string;
  serviceName: string;
  userId: string;
  date: string;
  time: string;
  status: BookingStatus;
  totalPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}
