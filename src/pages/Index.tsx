
import React from 'react';
import Hero from '@/components/Hero';
import SearchForm from '@/components/SearchForm';
import FeaturedProperties from '@/components/FeaturedProperties';
import PropertyTypeSection from '@/components/PropertyTypeSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <div className="container mx-auto px-4 -mt-14 relative z-20">
          <SearchForm />
        </div>
        
        <FeaturedProperties />
        
        <PropertyTypeSection />
        
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Property?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Join thousands of satisfied customers who found their perfect property with Makaan. 
              Start your property journey today.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/properties" className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Browse Properties
              </a>
              <a href="/contact" className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
