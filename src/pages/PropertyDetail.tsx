
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useProperties } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPropertyById, updateProperty } = useProperties();
  const { isAuthenticated, user } = useAuth();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const property = getPropertyById(id || '');
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <p className="mb-8">The property you are looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/properties')}>Browse Properties</Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleBuy = () => {
    if (!isAuthenticated) {
      toast.error("Please login to purchase this property");
      navigate('/login');
      return;
    }
    
    updateProperty(property.id, { 
      status: 'pending',
    });
    
    toast.success("Purchase request submitted successfully");
  };
  
  const handleRent = () => {
    if (!isAuthenticated) {
      toast.error("Please login to rent this property");
      navigate('/login');
      return;
    }
    
    updateProperty(property.id, { 
      status: 'pending',
    });
    
    toast.success("Rental request submitted successfully");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Property Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="text-gray-600 mt-1">{property.location}</p>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <span className="bg-primary/10 text-primary font-medium py-1 px-3 rounded-full text-sm">
                  {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
                <span className="mx-4 text-gray-400">•</span>
                <span className="text-gray-600">Posted on {new Date(property.postedDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(property.price)}
                  {property.type === 'rent' && <span className="text-sm text-gray-500 font-normal">/month</span>}
                </span>
              </div>
            </div>
          </div>
          
          {/* Property Images */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2 h-96 rounded-lg overflow-hidden">
              <img 
                src={property.images[activeImageIndex]} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`h-44 rounded-lg overflow-hidden cursor-pointer ${activeImageIndex === index ? 'ring-4 ring-primary' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image} alt={`${property.title} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Info */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Property Details</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 text-sm">Bedrooms</p>
                      <p className="font-bold text-lg">{property.bedrooms}</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 text-sm">Bathrooms</p>
                      <p className="font-bold text-lg">{property.bathrooms}</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 text-sm">Area</p>
                      <p className="font-bold text-lg">{property.area} sqft</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 text-sm">Status</p>
                      <p className="font-bold text-lg capitalize">{property.status}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{property.description}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Location</h2>
                  <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map placeholder - Would show actual map in production</p>
                  </div>
                  <p className="mt-4 text-gray-700">{property.location}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Action Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Interested in this property?</h3>
                  
                  <div className="space-y-4">
                    {property.type === 'sale' ? (
                      <Button 
                        className="w-full"
                        onClick={handleBuy}
                        disabled={property.status !== 'available'}
                      >
                        {property.status !== 'available' ? 'Not Available' : 'Buy Property'}
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={handleRent}
                        disabled={property.status !== 'available'}
                      >
                        {property.status !== 'available' ? 'Not Available' : 'Rent Property'}
                      </Button>
                    )}
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Contact Agent
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contact Property Agent</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="mb-4">To get more information about this property, please contact:</p>
                          <p className="font-semibold">Agent: John Smith</p>
                          <p>Email: john@makaan.com</p>
                          <p>Phone: (123) 456-7890</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
