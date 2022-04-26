import {
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from "react";
import { User } from "../util/types";

type AuthContext = {
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
};

const authContext = createContext<AuthContext>({
  user: null,
  setUser: () => null,
});

// Provider component that wraps app and makes auth object ...
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Hook for child components to get the auth object ...
export const useAuth = (): AuthContext => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);

  return { user, setUser };
};
