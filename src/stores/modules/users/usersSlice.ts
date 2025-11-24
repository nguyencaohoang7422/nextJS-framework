import { User } from "@/shared/types";
import { Pagination, UsersFilters, UsersSlice } from "@/stores/types";

/**
 * Users Module
 * Manages users page state
 */
export const loadUsersModule = async (): Promise<UsersSlice> => {
  // Simulate async loading
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    _moduleId: "users",
    _loaded: true,
    _loading: false,
    _error: null,

    users: [],
    selectedUser: null,
    filters: {},
    pagination: {
      page: 1,
      pageSize: 20,
      total: 0,
    },

    setUsers: (users: User[]) => {
      // Will be properly bound when integrated with store
    },

    selectUser: (user: User | null) => {
      // Will be properly bound when integrated with store
    },

    setFilters: (filters: UsersFilters) => {
      // Will be properly bound when integrated with store
    },

    setPagination: (pagination: Pagination) => {
      // Will be properly bound when integrated with store
    },
  };
};
