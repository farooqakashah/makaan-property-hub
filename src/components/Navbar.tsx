
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">Makaan</h1>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary font-medium">
            Home
          </Link>
          <Link to="/properties" className="text-gray-600 hover:text-primary font-medium">
            Properties
          </Link>
          <Link to="/buy" className="text-gray-600 hover:text-primary font-medium">
            Buy
          </Link>
          <Link to="/rent" className="text-gray-600 hover:text-primary font-medium">
            Rent
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-primary font-medium">
            About
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-primary font-medium">
                Dashboard
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
