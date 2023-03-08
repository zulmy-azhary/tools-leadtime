import React, { createContext, useContext, useState } from "react";
import type { TUserProfile } from "../types";
import Cookies from "js-cookie";

interface AuthCtx {
  user: TUserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<TUserProfile | null>>;
  onlineUsers: TUserProfile[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<TUserProfile[]>>;
  logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AuthContext = createContext<AuthCtx>({} as AuthCtx);

export const useAuth = (): AuthCtx => useContext(AuthContext);

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<TUserProfile | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<TUserProfile[]>([]);

  const logout = () => {
    setUser(null);
    Cookies.remove("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, onlineUsers, setOnlineUsers, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
