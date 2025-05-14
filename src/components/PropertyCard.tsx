
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Property } from '@/types';
import { formatPrice } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <Card 
      className="property-card overflow-hidden cursor-pointer h-full flex flex-col"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-primary text-white text-sm font-medium py-1 px-2 rounded">
          {property.type === 'sale' ? 'For Sale' : 'For Rent'}
        </div>
      </div>

      <CardContent className="flex-grow p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold truncate">{property.title}</h3>
          <p className="text-gray-600 truncate">{property.location}</p>
        </div>
        
        <p className="text-xl font-bold text-primary">
          {formatPrice(property.price)}
          {property.type === 'rent' && <span className="text-sm text-gray-500 font-normal">/month</span>}
        </p>
        
        <div className="mt-3 grid grid-cols-3 gap-1 text-sm text-gray-500">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <span>{property.area} sqft</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex-shrink-0">
        <p className="text-xs text-gray-500">
          Posted on {new Date(property.postedDate).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
