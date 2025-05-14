
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[600px] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop)'
        }}
      >
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Property with Makaan
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            Whether you're looking to buy, sell, or rent, we have the perfect property for you. 
            Start your journey to finding your dream home today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/buy">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Buy Property
              </Button>
            </Link>
            <Link to="/rent">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
                Rent Property
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
