
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthState } from "../types";
import { users } from "../data/users";
import { toast } from "sonner";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
      } catch (e) {
        localStorage.removeItem("user");
        setState({ ...initialState, loading: false });
      }
    } else {
      setState({ ...initialState, loading: false });
    }
  }, []);

  // Mock login function - in a real app this would call an API
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setState({ ...state, loading: true, error: null });
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any password with existing email
      const user = users.find((u) => u.email === email);
      
      if (!user) {
        setState({ ...state, loading: false, error: "Invalid email or password" });
        toast.error("Invalid email or password");
        return false;
      }
      
      // Store user in localStorage and update context
      localStorage.setItem("user", JSON.stringify(user));
      setState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      });
      
      toast.success("Successfully logged in!");
      return true;
    } catch (error) {
      setState({ ...state, loading: false, error: "An error occurred. Please try again." });
      toast.error("An error occurred. Please try again.");
      return false;
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setState({ ...state, loading: true, error: null });
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check if email is already taken
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        setState({ ...state, loading: false, error: "Email is already in use" });
        toast.error("Email is already in use");
        return false;
      }
      
      // Create new user (in a real app this would be done on the server)
      const newUser: User = {
        id: `user${users.length + 1}`,
        name,
        email,
      };
      
      // Store user in localStorage and update context
      localStorage.setItem("user", JSON.stringify(newUser));
      setState({
        isAuthenticated: true,
        user: newUser,
        loading: false,
        error: null,
      });
      
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      setState({ ...state, loading: false, error: "An error occurred. Please try again." });
      toast.error("An error occurred. Please try again.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
