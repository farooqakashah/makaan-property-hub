
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

interface PropertyTypeCardProps {
  title: string;
  imageUrl: string;
  count: number;
  link: string;
}

const PropertyTypeCard: React.FC<PropertyTypeCardProps> = ({ title, imageUrl, count, link }) => {
  return (
    <Link to={link}>
      <Card className="overflow-hidden h-full transition-transform hover:-translate-y-1">
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm text-white/80">{count} Properties</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const PropertyTypeSection: React.FC = () => {
  const propertyTypes = [
    {
      title: "Houses",
      imageUrl: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=2073&auto=format&fit=crop",
      count: 43,
      link: "/properties?type=house"
    },
    {
      title: "Apartments",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      count: 65,
      link: "/properties?type=apartment"
    },
    {
      title: "Villas",
      imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
      count: 12,
      link: "/properties?type=villa"
    },
    {
      title: "Commercial",
      imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
      count: 24,
      link: "/properties?type=commercial"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Browse By Property Type</h2>
          <p className="text-gray-600 mt-2">Explore properties by category</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyTypes.map((type, index) => (
            <PropertyTypeCard
              key={index}
              title={type.title}
              imageUrl={type.imageUrl}
              count={type.count}
              link={type.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypeSection;
