import { Product } from "@/app/types/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/products/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};
