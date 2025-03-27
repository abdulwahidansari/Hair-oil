"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { type ProductDataProps } from "@/ui/card/productCard";

interface ProductCardContextType {
  data: ProductDataProps["data"];
}

interface ProductCardProviderProps {
  children: ReactNode;
  data: ProductDataProps["data"];
}

const ProductCardContext = createContext<ProductCardContextType | null>(null);

export const ProductCardProvider = ({
  children,
  data,
}: ProductCardProviderProps) => {
  const value = useMemo(() => ({ data }), [data]);

  return (
    <ProductCardContext.Provider value={value}>
      {children}
    </ProductCardContext.Provider>
  );
};

export const useProductCardContext = () => {
  const context = useContext(ProductCardContext);
  
  if (!context) {
    throw new Error("useProductCardContext must be used within a ProductCardProvider");
  }

  return context;
};
