"use client";

import { ReactNode, createContext, useState } from "react";
import { TUser } from "../types/types";

type TAuthContext = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  signOut: () => void;
};

// Create the context
export const AuthContext = createContext<TAuthContext>({
  user: null,
  setUser: () => {},
  signOut: () => {},
});

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<TUser | null>(null);

  const setUserHandler = (user: TUser | null) => {
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: setUserHandler, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
