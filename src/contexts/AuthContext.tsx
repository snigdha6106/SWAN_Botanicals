import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { apiService, type LoginRequest, type SignupRequest } from "@/services/api";

export type User = {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  createdAt: string;
  lastLogin?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupRequest) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "swan_auth_user_v1";
const TOKEN_KEY = "swan_auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const savedUser = localStorage.getItem(STORAGE_KEY);
        
        if (token && savedUser) {
          // Verify token is still valid
          try {
            const response = await apiService.verifyToken();
            if (response.valid) {
              setUser(JSON.parse(savedUser));
            } else {
              // Token invalid, clear storage
              localStorage.removeItem(TOKEN_KEY);
              localStorage.removeItem(STORAGE_KEY);
            }
          } catch (error) {
            console.warn('Token verification failed:', error);
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.warn('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Save user data when user state changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch (error) {
      console.warn('Failed to save user to localStorage:', error);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await apiService.login({ email, password });
      
      if (response.success && response.token) {
        // Save token and user data
        localStorage.setItem(TOKEN_KEY, response.token);
        setUser(response.user);
        
        toast({ 
          title: "Welcome back!", 
          description: `Logged in as ${response.user.name}` 
        });
        
        setIsLoading(false);
        return true;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({ 
        title: "Login failed", 
        description: error instanceof Error ? error.message : 'Invalid email or password',
        variant: "destructive"
      });
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (data: SignupRequest): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await apiService.signup(data);
      
      if (response.success && response.token) {
        // Save token and user data
        localStorage.setItem(TOKEN_KEY, response.token);
        setUser(response.user);
        
        toast({ 
          title: "Welcome to Swan Botanicals!", 
          description: `Account created successfully for ${response.user.name}` 
        });
        
        setIsLoading(false);
        return true;
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({ 
        title: "Signup failed", 
        description: error instanceof Error ? error.message : 'Unable to create account',
        variant: "destructive"
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STORAGE_KEY);
    
    toast({ 
      title: "Logged out", 
      description: "You have been logged out successfully" 
    });
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
