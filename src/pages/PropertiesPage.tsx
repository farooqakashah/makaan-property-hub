
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import PropertyList from '@/components/PropertyList';
import { useProperties } from '@/contexts/PropertyContext';

const PropertiesPage: React.FC = () => {
  const location = useLocation();
  const { properties, filteredProperties, searchProperties } = useProperties();
  const [displayedProperties, setDisplayedProperties] = useState(filteredProperties);
  
  // Get search params from URL if they exist
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type') || '';
    
    // Apply search filters if URL has parameters
    if (type) {
      searchProperties({
        type: type === 'sale' || type === 'rent' ? type : ''
      });
    }
  }, [location.search, searchProperties]);
  
  useEffect(() => {
    setDisplayedProperties(filteredProperties);
  }, [filteredProperties]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Browse Properties</h1>
            <p className="text-gray-600 mb-6">
              Find your perfect property from our extensive listings
            </p>
            
            <SearchForm vertical />
            
            <div className="mt-8">
              <PropertyList 
                properties={displayedProperties}
                title={`${displayedProperties.length} Properties Found`}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertiesPage;
