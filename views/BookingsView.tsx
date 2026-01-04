
import React from 'react';
import { User, Booking, BookingStatus } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  user: User | null;
  bookings: Booking[];
}

const BookingsView: React.FC<Props> = ({ user, bookings }) => {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Sign In to View Bookings</h2>
          <p className="text-slate-500 mb-8">You need to be logged in to manage your appointments and see your history.</p>
          <Link to="/login" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition">Sign In Now</Link>
        </div>
      </div>
    );
  }

  const userBookings = bookings.filter(b => b.userId === user.id);

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING: return 'bg-yellow-100 text-yellow-700';
      case BookingStatus.CONFIRMED: return 'bg-green-100 text-green-700';
      case BookingStatus.CANCELLED: return 'bg-red-100 text-red-700';
      case BookingStatus.COMPLETED: return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">My Appointments</h1>
            <p className="text-slate-500">Keep track of your upcoming and past visits.</p>
          </div>
          <Link to="/" className="px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 transition shadow-sm">
            Book New
          </Link>
        </div>

        {userBookings.length > 0 ? (
          <div className="space-y-6">
            {userBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center text-indigo-600">
                    <span className="text-[10px] uppercase font-bold">{new Date(booking.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="text-xl font-bold">{new Date(booking.date).getDate()}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{booking.serviceName}</h3>
                    <p className="text-indigo-600 font-medium text-sm mb-2">{booking.saloonName}</p>
                    <div className="flex items-center text-xs text-slate-400 space-x-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {booking.time}
                      </span>
                      <span className="font-bold text-slate-900">${booking.totalPrice}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                  <button className="text-slate-400 hover:text-red-600 transition p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )).reverse()}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-200">
            <div className="text-slate-300 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-500 italic mb-8">You haven't booked any appointments yet.</p>
            <Link to="/" className="text-indigo-600 font-bold hover:underline">Browse Saloons &rarr;</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsView;
