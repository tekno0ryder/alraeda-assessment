// Hook (use-require-auth.js)
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "./useAuth";

export function useRequireAuth(redirectUrl = "/login") {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!auth.user) {
      history.replace(redirectUrl);
    }
  }, [auth, history, location, redirectUrl]);

  // Convert to boolean
  return !!auth.user;
}
