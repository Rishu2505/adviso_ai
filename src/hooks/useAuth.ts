import { useAuthStore } from "@/src/stores/useAuthStore";
import { useCallback } from "react";

export const useAuth = () => {
  // subscribe to pieces of state
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // actions
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  // memoized wrappers
  const doLogin = useCallback(
    (token: string, user: { id: string; name: string }) => {
      login(token, user);
    },
    [login]
  );

  const doLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    token,
    user,
    isAuthenticated,
    login: doLogin,
    logout: doLogout,
  };
};
