"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";

interface RootContextType {
  isRoot: boolean;
}

interface RootContextProviderProps {
  root: boolean;
  children: ReactNode;
}

const RootContext = createContext<RootContextType | null>(null);

export const RootContextProvider = ({
  root,
  children,
}: RootContextProviderProps) => {
  const value = useMemo(() => ({ isRoot: root }), [root]);

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export const useRootContext = () => {
  const context = useContext(RootContext);
  
  if (!context) {
    throw new Error("useRootContext must be used within a RootContextProvider");
  }

  return context;
};
