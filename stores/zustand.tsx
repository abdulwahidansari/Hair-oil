"use client";

// package
import { create } from "zustand";

type ProductDetailProps = {
  showDetail: boolean;
  setShowDetail: (detail: boolean) => void;
};

export const useProductDetail = create<ProductDetailProps>()((set) => ({
  showDetail: false,
  setShowDetail: (detail) => set({ showDetail: detail }),
}));

export type CartProductItem = {
  id: number;
  image: {
    src: string;
    alt: string;
  };
  name: string;
  color: string;
  quantity: number;
  price: number;
};

type CartProductsStoreProps = {
  total: number;
  products: CartProductItem[];
  addProduct: (product: CartProductItem) => void;
  removeProduct: (productId: CartProductItem["id"]) => void;
  addProductQuantity: (productId: CartProductItem["id"]) => void;
  updateTotal: () => void;
  getProductById: (productId: CartProductItem["id"]) => CartProductItem | undefined;
};

export const useCartProductsStore = create<CartProductsStoreProps>()(
  (set, get) => ({
    total: 0,
    products: [
      {
        id: 1,
        image: {
          src: "/images/sumplekuping-1.png",
          alt: "sumplekuping",
        },
        name: "Skullcandy - Rail True Wireless Earbuds",
        quantity: 2,
        price: 120,
        color: "Black",
      },
      {
        id: 2,
        image: {
          src: "/images/sumplekuping-2.png",
          alt: "sumplekuping",
        },
        name: "Sony - WH-CH720N Wireless Noise Canceling",
        quantity: 1,
        price: 420,
        color: "White",
      },
      {
        id: 3,
        image: {
          src: "/images/sumplekuping-4.png",
          alt: "sumplekuping",
        },
        name: "Bose QuietComfort Headphones",
        quantity: 3,
        price: 70,
        color: "Black",
      },
    ],
    getProductById: (productId) => {
      return get().products.find((product) => product.id === productId);
    },
    addProduct: (product) => {
      try {
        if (!product || !product.id) {
          throw new Error("Invalid product data");
        }
        set((state) => ({ ...state, products: [...state.products, product] }));
        get().updateTotal();
      } catch (error) {
        console.error("Error adding product:", error);
        // You might want to add error handling UI here
      }
    },
    removeProduct: (productId) => {
      try {
        set((state) => ({
          ...state,
          products: state.products.filter((product) => product.id !== productId),
        }));
        get().updateTotal();
      } catch (error) {
        console.error("Error removing product:", error);
      }
    },
    addProductQuantity: (productId) => {
      try {
        const product = get().getProductById(productId);
        if (!product) {
          throw new Error("Product not found");
        }
        
        set((state) => ({
          ...state,
          products: state.products.map((product) => {
            if (product.id === productId) {
              return { ...product, quantity: product.quantity + 1 };
            }
            return product;
          }),
        }));
        get().updateTotal();
      } catch (error) {
        console.error("Error updating product quantity:", error);
      }
    },
    updateTotal: () => {
      try {
        set((state) => ({
          ...state,
          total: state.products.reduce(
            (acc, product) => acc + product.quantity * product.price,
            0
          ),
        }));
      } catch (error) {
        console.error("Error updating total:", error);
      }
    },
  }),
);
