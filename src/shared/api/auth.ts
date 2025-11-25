// src/shared/api/auth.ts
import { API_ENDPOINTS } from "@/shared/constants";
import type {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/shared/types";
import { http } from "./http";

/**
 * Helper – returns a fake user object.
 * Adjust the fields to match your User type if needed.
 */
function getMockUser(): User {
  return {
    _id: "6501ca04bf7f165d65a13229",
    id: "6501ca04bf7f165d65a13222",
    firstname: "Demo01",
    lastname: "VCVdev",
    imageURL:
      "https://vcloud.vcv.vn:20981/Data/Public/Image/20240306113853_316286da-4439-47d7-b0aa-9890d1e4af9a.png",
    phoneNumber: "",
    gender: 1,
    birthday: "",
    address: "asd",
    username: "vcvdev-demo01",
    authorId: "VCVdev-Admin",
    managerId: "VCVdev-Admin",
    userPermissionTypeId: "VCVdev-Users",
    userTypeId: "",
    partnerCompanyId: "VCVdev",
    partnerCompanyBranchId: "",
    mustChangePassword: false,
    lastLoginOn: 1763762861374,
    tokenConfiguration: null,
    uiSettings: {
      companyBackgroundURL:
        "https://vcloud.vcv.vn:20981/Data/Public/Image/20230405133239_9e4f1288-1789-4363-974d-a000ea69704b.jpeg",
      companyLogoURL:
        "https://vcloud.vcv.vn:20981/Data/Public/Image/20230903152959_1c12eb28-f8d1-4d51-8d5e-0449854e8402.png",
      companyName: "VCVdev",
      companyId: "VCVdev",
      rememberMe: true,
      theme: {
        primary: "#2A80C3",
        primaryLighten: "#e8f3fc",
        secondary: "#00153b",
        success: "#07bc0c",
        warning: "#FFCC48",
        danger: "#CD1111",
        error: "#ff4d4f",
        link: "#2a80c3",
        disabled: "#717F87",
        border: "#E1E3E5",
        background: "#f6f6f6",
        iconGrey: "#8F9AA1",
      },
      treejs: {
        treeMode: "multi",
        treeHideIcon: false,
      },
    },
    passwordExpirationDateTime: 1768898317684,
    token: "7416d0b67c7b5decea141283a1b39a06b3076e010d7a849f93597e14db",
    partnerCompanyName: "VCVdev",
    partnerCompanyImageURL:
      "https://vcloud.vcv.vn:20981/Data/Public/Image/20230405133239_9e4f1288-1789-4363-974d-a000ea69704b.jpeg",
    partnerCompanyLogoURL:
      "https://vcloud.vcv.vn:20981/Data/Public/Image/20230903152959_1c12eb28-f8d1-4d51-8d5e-0449854e8402.png",
    passwordExpiresIn: 60,
    webAdminURL: "https://dev-vcloud.web.app:81",
  };
}

/**
 * authApi – switches between real HTTP calls and a local mock
 * based on the NEXT_PUBLIC_MOCK flag.
 */
export const authApi = {
  // -----------------------------------------------------------------
  // Login – always succeed in mock mode, otherwise call the backend
  // -----------------------------------------------------------------
  login: async (payload: LoginCredentials) => {
    if (process.env.NEXT_PUBLIC_MOCK === "true") {
      // Simulate a short network delay
      return new Promise<ApiResponse<User>>((resolve) => {
        setTimeout(() => {
          resolve({ success: true, result: getMockUser(), message: null });
        }, 300);
      });
    }
    // Real request
    return await http
      .post<AuthResponse<User>>(API_ENDPOINTS.auth.login, payload)
      .then((r) => r.data);
  },

  loginWithToken: async (token: string) => {
    if (process.env.NEXT_PUBLIC_MOCK === "true") {
      // Simulate a short network delay
      return new Promise<ApiResponse<User>>((resolve) => {
        setTimeout(() => {
          resolve({ success: true, result: getMockUser(), message: null });
        }, 300);
      });
    }

    http.interceptors.request.use((config) => {
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    // Real request - token should be sent via header in http interceptor
    // The http instance should automatically attach the token from cookies
    return await http
      .post<AuthResponse<User>>(API_ENDPOINTS.auth.login, {})
      .then((r) => r.data);
  },

  // -----------------------------------------------------------------
  // Logout – just resolves in mock mode
  // -----------------------------------------------------------------
  logout: async () => {
    if (process.env.NEXT_PUBLIC_MOCK === "true") {
      return Promise.resolve({ success: true, message: "Logged out (mock)" });
    }
    return await http
      .post<ApiResponse<User>>(API_ENDPOINTS.auth.logout)
      .then((r) => r.data);
  },

  // -----------------------------------------------------------------
  // Register – just resolves with a success flag in mock mode
  // -----------------------------------------------------------------
  register: async (payload: RegisterCredentials) => {
    if (process.env.NEXT_PUBLIC_MOCK === "true") {
      return new Promise<ApiResponse<User>>((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            result: getMockUser(),
            message: "Registered (mock)",
          });
        }, 300);
      });
    }
    return http
      .post<ApiResponse<User>>(API_ENDPOINTS.auth.register, payload)
      .then((r) => r.data);
  },
};
