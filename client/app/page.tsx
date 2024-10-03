"use client";

import AutoResizingGrid from "@/components/AutoResizingGrid/AutoResizingGrid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "./types/types";
import { fetchProducts } from "@/services/data";

export default function Home() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        setData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-5 my-5 p-2">
      <div className="flex items-baseline gap-2">
        <h1 className="text-3xl font-bold">Products</h1>
        <span className="text-xs font-light text-gray-500">(200)</span>
      </div>
      <AutoResizingGrid minWidth={300} gap={20}>
        {data.map((datum, index) => (
          <div
            key={index}
            className="bg-gray-50 h-[350px] space-y-4 p-4 shadow-md"
          >
            <Image
              src={datum.image}
              alt="image"
              width={300}
              height={250}
              priority={index === 0}
              className="object-cover w-full h-[250px]"
            />
            <div>
              <p className="font-normal">{datum.name}</p>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <p>{datum.id}</p>
                <p>{datum.price}</p>
              </div>
            </div>
          </div>
        ))}
      </AutoResizingGrid>
    </div>
  );
}
