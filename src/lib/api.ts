interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  user?: {
    id: number;
    username: string;
    email: string;
    role: string;
    name: string;
  };
}

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseUrl = "/api";

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        credentials: "include", // 包含 cookies
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // 管理员登录
  async adminLogin(
    credentials: LoginRequest
  ): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>("/admin/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  // 管理员登出
  async adminLogout(): Promise<ApiResponse> {
    return this.request("/admin/logout", {
      method: "POST",
    });
  }

  // 获取当前用户信息
  async getCurrentUser(): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>("/admin/me");
  }
}

export const apiClient = new ApiClient();
export type { LoginRequest, LoginResponse, ApiResponse };
