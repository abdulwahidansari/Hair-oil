import { apiProducts } from "@/lib/product";

export async function GET() {
  return Response.json(apiProducts);
}
