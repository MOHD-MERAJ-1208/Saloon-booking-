
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SALOONS, TIME_SLOTS } from '../constants';
import { User, Booking, BookingStatus, Service } from '../types';

interface Props {
  user: User | null;
  onAddBooking: (b: Booking) => void;
}

const SaloonDetailView: React.FC<Props> = ({ user, onAddBooking }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const saloon = SALOONS.find(s => s.id === id);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isBooking, setIsBooking] = useState(false);

  if (!saloon) return <div className="p-20 text-center">Saloon not found</div>;

  const handleBooking = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!selectedService || !selectedDate || !selectedTime) {
      alert("Please select a service, date, and time slot.");
      return;
    }

    setIsBooking(true);
    
    // Simulate API call
    setTimeout(() => {
      const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        saloonId: saloon.id,
        saloonName: saloon.name,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        userId: user.id,
        date: selectedDate,
        time: selectedTime,
        status: BookingStatus.PENDING,
        totalPrice: selectedService.price
      };

      onAddBooking(newBooking);
      setIsBooking(false);
      navigate('/bookings');
    }, 1500);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="h-96 relative">
        <img src={saloon.image} alt={saloon.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{saloon.name}</h1>
            <p className="text-slate-200 text-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {saloon.address}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Services List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Our Services</h2>
            <div className="space-y-4">
              {saloon.services.map(service => (
                <div 
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${
                    selectedService?.id === service.id ? 'border-indigo-600 bg-indigo-50' : 'border-white bg-white hover:border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                      <span className="text-[10px] bg-slate-100 text-slate-500 uppercase tracking-widest font-bold px-2 py-0.5 rounded-full">{service.category}</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-2">{service.description}</p>
                    <div className="flex items-center text-xs text-slate-400">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {service.durationMinutes} mins
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xl font-bold text-indigo-600">${service.price}</div>
                    {selectedService?.id === service.id && (
                      <span className="text-xs font-bold text-indigo-600 uppercase">Selected</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl sticky top-24 border border-slate-100">
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">Book Appointment</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                  <input 
                    type="date"
                    min={minDate}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-1 text-xs rounded-lg border font-medium transition ${
                          selectedTime === slot ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 text-slate-600 hover:border-indigo-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500">Service</span>
                    <span className="font-medium text-slate-900">{selectedService?.name || '---'}</span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-500">Total Price</span>
                    <span className="text-2xl font-bold text-slate-900">${selectedService?.price || 0}</span>
                  </div>

                  <button
                    disabled={isBooking || !selectedService || !selectedDate || !selectedTime}
                    onClick={handleBooking}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isBooking ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Confirming...</span>
                      </>
                    ) : (
                      <span>Confirm Booking</span>
                    )}
                  </button>
                  <p className="text-xs text-slate-400 text-center mt-4">Payment will be handled at the saloon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaloonDetailView;
