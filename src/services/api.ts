const API_BASE_URL = 'http://localhost:5000/api';

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  details?: string;
  data?: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    createdAt: string;
    lastLogin?: string;
  };
}

export interface OrderRequest {
  items: Array<{
    id: string;
    name: string;
    price: number;
    qty: number;
    image?: string;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  notes?: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  orderId: string;
  estimatedDelivery: string;
  total: number;
  order: {
    id: string;
    orderId: string;
    items: any[];
    total: number;
    status: string;
    estimatedDelivery: string;
    createdAt: string;
  };
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('swan_auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async verifyToken(): Promise<{ success: boolean; valid: boolean; user: any }> {
    return this.makeRequest('/auth/verify-token', {
      method: 'POST',
    });
  }

  async getProfile(): Promise<{ success: boolean; user: any }> {
    return this.makeRequest('/auth/profile');
  }

  async updateProfile(profileData: any): Promise<{ success: boolean; user: any }> {
    return this.makeRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Order endpoints
  async createOrder(orderData: OrderRequest): Promise<OrderResponse> {
    return this.makeRequest<OrderResponse>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(page = 1, limit = 10): Promise<any> {
    return this.makeRequest(`/orders?page=${page}&limit=${limit}`);
  }

  async getOrder(orderId: string): Promise<any> {
    return this.makeRequest(`/orders/${orderId}`);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string; timestamp: string }> {
    return this.makeRequest('/health');
  }
}

export const apiService = new ApiService();
