"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Plan {
  id: string;
  name: string;
  price: number;
  credits: number;
  validity?: number | null;
  image?: string | null;
  description: string;
}

interface Payment {
  id: string;
  plan: Plan;
  verifiedAt?: string | null;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
}

interface User {
  id: string;
  email: string;
  active: boolean;
  credits: number;
  totalCredits: number;
  currentPlan?: Plan | null;
  totalRequests: number;
  apiKeys?: { key: string }[];
  image?: string;
  provider: string | null;
  createdAt: string;
  payments?: Payment[]; 
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data);

      if (data && data.active === false) {
        window.location.href = "/blocked";
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
