
import React from 'react';
import { Link } from 'react-router-dom';
import PropertyList from './PropertyList';
import { Button } from "@/components/ui/button";
import { useProperties } from '@/contexts/PropertyContext';

const FeaturedProperties: React.FC = () => {
  const { properties } = useProperties();
  
  // Get 3 most recent properties
  const featuredProperties = properties
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <p className="text-gray-600 mt-2">Explore our handpicked selection of properties</p>
          </div>
          <Link to="/properties">
            <Button variant="outline">
              View All Properties
            </Button>
          </Link>
        </div>
        
        <PropertyList properties={featuredProperties} />
      </div>
    </section>
  );
};

export default FeaturedProperties;
