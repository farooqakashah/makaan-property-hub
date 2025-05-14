
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useProperties } from '@/contexts/PropertyContext';
import { formatPrice } from '@/lib/utils';

interface SearchFormProps {
  vertical?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ vertical = false }) => {
  const navigate = useNavigate();
  const { searchProperties } = useProperties();
  
  const [searchParams, setSearchParams] = useState({
    query: '',
    type: '',
    priceRange: [0, 2000000] as [number, number],
    bedrooms: 0,
    bathrooms: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      query: e.target.value
    });
  };

  const handleTypeChange = (value: string) => {
    setSearchParams({
      ...searchParams,
      type: value
    });
  };

  const handlePriceChange = (value: number[]) => {
    setSearchParams({
      ...searchParams,
      priceRange: [value[0], value[1]] as [number, number]
    });
  };

  const handleBedroomsChange = (value: string) => {
    setSearchParams({
      ...searchParams,
      bedrooms: parseInt(value)
    });
  };

  const handleBathroomsChange = (value: string) => {
    setSearchParams({
      ...searchParams,
      bathrooms: parseInt(value)
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    searchProperties({
      query: searchParams.query,
      type: searchParams.type as 'sale' | 'rent' | '',
      minPrice: searchParams.priceRange[0],
      maxPrice: searchParams.priceRange[1],
      bedrooms: searchParams.bedrooms === 0 ? undefined : searchParams.bedrooms,
      bathrooms: searchParams.bathrooms === 0 ? undefined : searchParams.bathrooms
    });
    
    navigate('/properties');
  };

  return (
    <div className={`${vertical ? 'space-y-4' : 'flex items-center space-x-4'} p-4 bg-white shadow-md rounded-lg`}>
      <form onSubmit={handleSearch} className={`w-full ${vertical ? 'space-y-4' : 'flex items-center space-x-4'}`}>
        <div className={`${vertical ? 'w-full' : 'w-2/5'}`}>
          <Input
            type="text"
            placeholder="Search by location, property name..."
            value={searchParams.query}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className={`${vertical ? 'w-full' : 'w-1/5'}`}>
          <Select
            value={searchParams.type}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Type</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className={`${vertical ? 'w-full' : 'w-1/5'}`}>
          <div className="space-y-2">
            <p className="text-sm font-medium">Price Range</p>
            <div className="px-2">
              <Slider
                defaultValue={[0, 2000000]}
                max={2000000}
                step={50000}
                value={searchParams.priceRange}
                onValueChange={handlePriceChange}
                className="py-4"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatPrice(searchParams.priceRange[0])}</span>
              <span>{formatPrice(searchParams.priceRange[1])}</span>
            </div>
          </div>
        </div>
        
        <div className={`${vertical ? 'w-full flex gap-4' : 'w-1/5 flex gap-2'}`}>
          <div className="w-1/2">
            <Select
              value={searchParams.bedrooms.toString()}
              onValueChange={handleBedroomsChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-1/2">
            <Select
              value={searchParams.bathrooms.toString()}
              onValueChange={handleBathroomsChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Baths" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button type="submit" className={`${vertical ? 'w-full' : ''}`}>
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
