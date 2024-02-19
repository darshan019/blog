import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { User } from "./Container";

const TokenContext = createContext<Token | null>(null);
const TokenUpdateContext = createContext<setToken | null>(null);

const UserContext = createContext<User | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export function useToken() {
  return useContext(TokenContext);
}

export function useTokenUpdate() {
  return useContext(TokenUpdateContext);
}

type Token = string | null;
type setToken = (tkn: Token) => void;

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken_] = useState<Token>(null);
  const [user, setUser] = useState<User | null>(null);

  const setToken: setToken = (newToken: Token) => setToken_(newToken);

  useEffect(() => {
    async function fetchUser() {
      if (token) {
        const response = await fetch("http://localhost:3000/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch Posts and user");
        const info = await response.json();
        setUser(info.user);
      }
    }

    fetchUser();
  }, [token]);

  return (
    <TokenContext.Provider value={token}>
      <TokenUpdateContext.Provider value={setToken}>
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
      </TokenUpdateContext.Provider>
    </TokenContext.Provider>
  );
};

export default AuthProvider;
