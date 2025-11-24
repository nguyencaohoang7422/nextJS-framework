// ============================================
// User Types
// ============================================

export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
  phone?: string;
}

export interface UpdateUserDto {
  name?: string;
  role?: UserRole;
  status?: UserStatus;
  phone?: string;
  avatar?: string;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  result?: T;
  message?: string | null;
  code?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ============================================
// Filter Types
// ============================================

export interface UserFilters extends PaginationParams, SortParams {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
}

// ============================================
// Auth Types
// ============================================

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse<T> {
  success?: boolean;
  result?: T;
  message?: string | null;
  code?: number;
}

export type User = {
  _id: string;
  id: string;
  firstname?: string;
  lastname?: string;
  imageURL?: string;
  phoneNumber?: string;
  gender?: number;
  birthday?: string;
  address?: string;
  username?: string;
  authorId?: string;
  managerId?: string;
  userPermissionTypeId?: string;
  userTypeId?: string;
  partnerCompanyId?: string;
  partnerCompanyBranchId?: string;
  mustChangePassword?: boolean;
  lastLoginOn?: number;
  tokenConfiguration?: null;
  uiSettings?: {
    companyBackgroundURL?: string;
    companyLogoURL?: string;
    companyName?: string;
    companyId?: string;
    rememberMe?: boolean;
    theme?: {
      primary?: string;
      primaryLighten?: string;
      secondary?: string;
      success?: string;
      warning?: string;
      danger?: string;
      error?: string;
      link?: string;
      disabled?: string;
      border?: string;
      background?: string;
      iconGrey?: string;
    };
    treejs?: {
      treeMode?: string;
      treeHideIcon?: boolean;
    };
  };
  passwordExpirationDateTime?: number;
  token?: string;
  partnerCompanyName?: string;
  partnerCompanyImageURL?: string;
  partnerCompanyLogoURL?: string;
  passwordExpiresIn?: number;
  webAdminURL?: string;
};

export interface MeResponse {
  user: User | null;
}

// ============================================
// Form Types
// ============================================

export interface FormFieldError {
  field: string;
  message: string;
}

export interface ValidationError {
  errors: FormFieldError[];
}
