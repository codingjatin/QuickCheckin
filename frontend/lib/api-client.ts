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
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
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
}

export const apiClient = new ApiClient(API_BASE_URL);
