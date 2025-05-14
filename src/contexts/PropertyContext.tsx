
import React, { createContext, useContext, useState } from "react";
import { Property } from "../types";
import { properties as initialProperties } from "../data/properties";
import { toast } from "sonner";

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  searchProperties: (params: SearchParams) => void;
  getPropertyById: (id: string) => Property | undefined;
  addProperty: (property: Omit<Property, "id" | "postedDate" | "status">) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
}

interface SearchParams {
  query?: string;
  type?: 'sale' | 'rent' | '';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialProperties);

  const searchProperties = (params: SearchParams) => {
    let results = [...properties];
    
    // Filter by search query (title, description, or location)
    if (params.query) {
      const query = params.query.toLowerCase();
      results = results.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query)
      );
    }
    
    // Filter by property type
    if (params.type) {
      results = results.filter((property) => property.type === params.type);
    }
    
    // Filter by price range
    if (params.minPrice !== undefined) {
      results = results.filter((property) => property.price >= params.minPrice!);
    }
    
    if (params.maxPrice !== undefined) {
      results = results.filter((property) => property.price <= params.maxPrice!);
    }
    
    // Filter by bedrooms
    if (params.bedrooms !== undefined) {
      results = results.filter((property) => property.bedrooms >= params.bedrooms!);
    }
    
    // Filter by bathrooms
    if (params.bathrooms !== undefined) {
      results = results.filter((property) => property.bathrooms >= params.bathrooms!);
    }
    
    setFilteredProperties(results);
  };

  const getPropertyById = (id: string) => {
    return properties.find((property) => property.id === id);
  };

  const addProperty = (property: Omit<Property, "id" | "postedDate" | "status">) => {
    const newProperty: Property = {
      ...property,
      id: `property-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'available',
    };
    
    setProperties([newProperty, ...properties]);
    setFilteredProperties([newProperty, ...filteredProperties]);
    toast.success("Property added successfully!");
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    const updatedProperties = properties.map((property) =>
      property.id === id ? { ...property, ...updates } : property
    );
    
    setProperties(updatedProperties);
    setFilteredProperties(
      filteredProperties.map((property) =>
        property.id === id ? { ...property, ...updates } : property
      )
    );
    
    toast.success("Property updated successfully!");
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter((property) => property.id !== id));
    setFilteredProperties(filteredProperties.filter((property) => property.id !== id));
    toast.success("Property deleted successfully!");
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        searchProperties,
        getPropertyById,
        addProperty,
        updateProperty,
        deleteProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  return context;
};
