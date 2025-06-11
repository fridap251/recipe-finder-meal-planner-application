// API client for FastAPI backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('access_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  // Auth endpoints
  async getGitLabAuthUrl() {
    return this.request<{ url: string }>('/auth/gitlab');
  }

  async handleGitLabCallback(code: string) {
    return this.request<{ access_token: string; token_type: string }>(
      `/auth/callback?code=${code}`
    );
  }

  // Recipe recommendation
  async getRecommendations(query: string, image?: File) {
    const formData = new FormData();
    formData.append('query', query);
    if (image) {
      formData.append('image', image);
    }

    try {
      const url = `${this.baseUrl}/api/recommend`;
      const headers: HeadersInit = {};

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Recommendation request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Meal planning
  async generateMealPlan(data: {
    query: string;
    calorie_target?: number;
    macro_split?: { protein: number; carbs: number; fat: number };
  }) {
    return this.request<{ meal_plan: any[] }>('/api/meal-plan', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Recipe rating
  async rateRecipe(recipeId: string, rating: number, feedback?: string) {
    return this.request<{ message: string }>('/api/rate', {
      method: 'POST',
      body: JSON.stringify({
        recipe_id: recipeId,
        rating,
        feedback,
      }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;