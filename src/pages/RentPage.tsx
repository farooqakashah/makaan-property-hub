
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import PropertyList from '@/components/PropertyList';
import { useProperties } from '@/contexts/PropertyContext';

const RentPage: React.FC = () => {
  const { properties } = useProperties();
  
  // Filter properties for rent
  const rentalProperties = properties.filter(property => 
    property.type === 'rent' && property.status === 'available'
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative">
          <div 
            className="h-96 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop)'
            }}
          >
            <div className="absolute inset-0 hero-gradient flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl text-white">
                  <h1 className="text-4xl font-bold mb-4">Find Your Perfect Rental</h1>
                  <p className="text-lg mb-6">
                    Browse our selection of properties for rent and find your next home
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 -mt-14 relative z-10">
            <SearchForm />
          </div>
        </div>
        
        {/* Properties Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Properties For Rent</h2>
            <p className="text-gray-600 mt-1">
              {rentalProperties.length} properties available for rent
            </p>
          </div>
          
          <PropertyList properties={rentalProperties} />
        </div>
        
        {/* Renting Guide Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Renting Guide</h2>
              <p className="text-gray-600">
                Follow these simple steps to make your rental process smooth and successful
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Your Rental</h3>
                <p className="text-gray-600">
                  Browse our extensive rental listings to find your ideal home. Use filters to narrow down your search.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Schedule a Viewing</h3>
                <p className="text-gray-600">
                  Contact our agents to arrange a viewing of the property that interests you.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Sign the Agreement</h3>
                <p className="text-gray-600">
                  Once you've found your ideal rental, complete the paperwork and move into your new home.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RentPage;
