"use client";

import { ReactNode, createContext, useState } from "react";

// Define the shape of the user object
interface User {
  id: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  imageUrl: string | null;
}

type TAuthContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Create the context
const AuthContext = createContext<TAuthContext>({
  user: null,
  setUser: () => {},
});

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const setUserHandler = (user: User | null) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: setUserHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
