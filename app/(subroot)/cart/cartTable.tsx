"use client";

// ui
import CartItem from "@/app/(subroot)/cart/cartItem";
import { useCartProductsStore } from "@/stores/zustand";

const CartTable = () => {
  const cartProducts = useCartProductsStore((state) => state.products);

  return (
    <table className="h-fit w-full">
      <thead className="border-b border-[#141718]">
        <tr className="text-left">
          <th className="pb-6 font-poppins text-base font-semibold text-[#141718]">
            Product
          </th>
          <th className="hidden pb-6 text-center font-poppins text-base font-semibold text-[#141718] sm:table-cell">
            Quantity
          </th>
          <th className="hidden pb-6 text-center font-poppins text-base font-semibold text-[#141718] sm:table-cell">
            Price
          </th>
          <th className="hidden pb-6 text-center font-poppins text-base font-semibold text-[#141718] sm:table-cell">
            Subtotal
          </th>
        </tr>
      </thead>

      <tbody>
        {cartProducts.map((cart) => (
          <tr
            key={cart.id}
            className="border-b border-[#E8ECEF] last:border-b-0"
          >
            <CartItem product={cart} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
