const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5172';

export interface ApiError {
  message: string;
  status?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ data?: T; error?: ApiError }> {
    try {
      // Get token from localStorage
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {}),
      };

      // Add Authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // If 401, token is invalid - clear it
        if (response.status === 401 && typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }

        return {
          error: {
            message: data.message || 'An error occurred',
            status: response.status,
          },
        };
      }

      return { data };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Network error',
        },
      };
    }
  }

  async requestOTP(phone: string, role: 'admin' | 'guest') {
    return this.request<{ message: string }>('/api/restaurant/request-login-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, role }),
    });
  }

  async verifyOTP(phone: string, role: 'admin' | 'guest', otp: string) {
    return this.request<{
      message: string;
      token: string;
      restaurant: {
        id: string;
        name: string;
        city: string;
        email: string;
        phone: string;
        logo: string;
      };
    }>('/api/restaurant/verify-login-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, role, otp }),
    });
  }

  async validateToken(token: string) {
    return this.request<{
      restaurantId: string;
      phone: string;
      role: 'admin' | 'guest';
      restaurant: {
        id: string;
        name: string;
        city: string;
        email: string;
        phone: string;
        logo: string;
      };
    }>('/api/restaurant/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async createBooking(
    restaurantId: string,
    customerName: string,
    customerPhone: string,
    partySize: number
  ) {
    return this.request<{
      message: string;
      booking: {
        id: string;
        customerName: string;
        customerPhone: string;
        partySize: number;
        waitTime: number;
        estimatedSeatingTime: string;
      };
    }>(`/api/${restaurantId}/bookings`, {
      method: 'POST',
      body: JSON.stringify({ customerName, customerPhone, partySize }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
