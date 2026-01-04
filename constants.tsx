
import { Saloon, Service } from './types';

export const SERVICES: Service[] = [
  { id: 's1', name: 'Classic Haircut', price: 25, durationMinutes: 45, category: 'Hair', description: 'Precision cutting and styling.' },
  { id: 's2', name: 'Full Color & Blowout', price: 120, durationMinutes: 120, category: 'Hair', description: 'Vibrant color and signature blow dry.' },
  { id: 's3', name: 'Deep Cleansing Facial', price: 85, durationMinutes: 60, category: 'Skin', description: 'Rejuvenate your skin with premium products.' },
  { id: 's4', name: 'Gel Manicure', price: 45, durationMinutes: 45, category: 'Nails', description: 'Long-lasting high-shine polish.' },
  { id: 's5', name: 'Swedish Massage', price: 95, durationMinutes: 60, category: 'Massage', description: 'Relaxation techniques for stress relief.' },
  { id: 's6', name: 'Bridal Makeup', price: 250, durationMinutes: 150, category: 'Makeup', description: 'Stunning look for your special day.' },
];

export const SALOONS: Saloon[] = [
  {
    id: '1',
    name: 'Lumina Beauty Studio',
    address: '123 Crystal Avenue, Downtown',
    rating: 4.8,
    reviewsCount: 128,
    image: 'https://picsum.photos/seed/lumina/800/600',
    services: SERVICES.slice(0, 4),
    ownerId: 'owner1'
  },
  {
    id: '2',
    name: 'The Gentry Barber',
    address: '45 Heritage Lane, Old Town',
    rating: 4.9,
    reviewsCount: 256,
    image: 'https://picsum.photos/seed/barber/800/600',
    services: [SERVICES[0], SERVICES[4]],
    ownerId: 'owner2'
  },
  {
    id: '3',
    name: 'Velvet Skin & Spa',
    address: '88 Serenity Blvd, North Hills',
    rating: 4.7,
    reviewsCount: 89,
    image: 'https://picsum.photos/seed/spa/800/600',
    services: [SERVICES[2], SERVICES[4], SERVICES[5]],
    ownerId: 'owner1'
  }
];

export const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM'
];
