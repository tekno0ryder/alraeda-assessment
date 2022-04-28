// Hook (use-require-auth.js)
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "./useAuth";

type RequireAuthType = { requireAdmin?: boolean };

export function useRequireAuth(options: RequireAuthType = {}) {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!auth.user || (options.requireAdmin && !auth.user.isAdmin)) {
      history.replace("/login");
    }
  }, [auth, history, location, options]);

  // Convert to boolean
  return !!auth.user;
}
