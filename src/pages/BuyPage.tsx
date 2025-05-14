
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import PropertyList from '@/components/PropertyList';
import { useProperties } from '@/contexts/PropertyContext';

const BuyPage: React.FC = () => {
  const { properties } = useProperties();
  
  // Filter properties for sale
  const saleProperties = properties.filter(property => 
    property.type === 'sale' && property.status === 'available'
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop)'
            }}
          >
            <div className="absolute inset-0 hero-gradient flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl text-white">
                  <h1 className="text-4xl font-bold mb-4">Find Your Dream Home</h1>
                  <p className="text-lg mb-6">
                    Browse our selection of properties for sale and find the perfect place to call home
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
            <h2 className="text-3xl font-bold">Properties For Sale</h2>
            <p className="text-gray-600 mt-1">
              {saleProperties.length} properties available for purchase
            </p>
          </div>
          
          <PropertyList properties={saleProperties} />
        </div>
        
        {/* Buying Guide Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Buying Guide</h2>
              <p className="text-gray-600">
                Follow these simple steps to make your property purchase smooth and successful
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Your Property</h3>
                <p className="text-gray-600">
                  Browse our extensive property listings to find your perfect match. Use filters to narrow down your search.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Contact Agent</h3>
                <p className="text-gray-600">
                  Get in touch with our professional agents who will guide you through the purchasing process.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Close the Deal</h3>
                <p className="text-gray-600">
                  Complete the paperwork and payment to become the proud owner of your new property.
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

export default BuyPage;
