// Hook (use-require-auth.js)
import { useIonRouter } from "@ionic/react";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

export function useRequireAuth(redirectUrl = "/login") {
  const auth = useAuth();
  const router = useIonRouter();

  useEffect(() => {
    if (!auth.user) {
      router.push(redirectUrl);
    }
  }, [auth]);

  // Convert to boolean
  return !!auth.user;
}
