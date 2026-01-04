
import React, { useState } from 'react';
import { SALOONS } from '../constants';
import { Link } from 'react-router-dom';

const HomeView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSaloons = SALOONS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/salon-hero/1600/900" 
            alt="Hero Background" 
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Discover Your Perfect <br /><span className="text-indigo-400">Beauty Sanctuary</span>
          </h1>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
            Book premium saloons and spas instantly. Experience the future of grooming with our AI-powered style previews.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              placeholder="Search by saloon name or city..."
              className="block w-full pl-12 pr-4 py-4 rounded-full border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 shadow-xl text-slate-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Featured Saloons</h2>
            <p className="text-slate-500">Hand-picked premium studios near you</p>
          </div>
          <Link to="/" className="text-indigo-600 font-medium hover:underline">View all</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSaloons.length > 0 ? (
            filteredSaloons.map(saloon => (
              <Link 
                key={saloon.id} 
                to={`/saloon/${saloon.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={saloon.image} 
                    alt={saloon.name} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center shadow-sm">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-bold text-slate-800">{saloon.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition">{saloon.name}</h3>
                  <p className="text-slate-500 text-sm mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {saloon.address}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {saloon.services.slice(0, 3).map(service => (
                      <span key={service.id} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{service.name}</span>
                    ))}
                    {saloon.services.length > 3 && (
                      <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">+{saloon.services.length - 3} more</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-sm text-slate-400">{saloon.reviewsCount} reviews</span>
                    <span className="text-indigo-600 font-bold">Book Now &rarr;</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-slate-100 rounded-3xl">
              <p className="text-slate-500 italic">No saloons found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Style Lab Promo */}
      <section className="bg-indigo-900 py-20 mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/30 border border-indigo-400 text-indigo-200 text-xs font-bold mb-4 uppercase tracking-widest">Nano Banana Powered</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Preview Your New Look <br />With AI Previews</h2>
              <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                Not sure about that new hairstyle or makeup? Upload your photo to our <b>Style Lab</b> and let Gemini 2.5 Flash Image generate a realistic preview of your transformation.
              </p>
              <Link 
                to="/lab" 
                className="inline-block bg-white text-indigo-900 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition shadow-lg"
              >
                Try Style Lab AI
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/stylelab/600/600" 
                  alt="Style AI Preview" 
                  className="rounded-2xl shadow-2xl rotate-3"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl -rotate-6">
                  <p className="text-indigo-900 font-bold text-sm">"Add a platinum blonde bob"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
