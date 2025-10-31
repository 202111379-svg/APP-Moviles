import React, { createContext, useContext, useMemo, useState } from "react";
import type { Session } from "./authService";
import { login as doLogin, logout as doLogout } from "./authService";

type AuthContextType = {
  session: Session | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  const value = useMemo(() => ({
    session,
    signIn: async () => setSession(await doLogin()),
    signOut: async () => { await doLogout(); setSession(null); },
  }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
