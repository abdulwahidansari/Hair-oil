import { NextResponse } from "next/server";

import { apiProducts } from "@/lib/product";

export async function GET(
  _request: Request,
  { params }: { params: { productId: string } },
) {
  const productData = apiProducts.find((product) => product.id === params.productId);

  if (!productData) {
    return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
  }

  return Response.json(productData);
}
