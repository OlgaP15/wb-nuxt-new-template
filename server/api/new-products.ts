import type { Product } from "~/models/products.model";

const getNewProducts = (products: Product[]) => {
  return products
    .filter((c) => (c.label || "").toLowerCase() === "new")
    .slice(0, 4);
};

export default defineEventHandler(async (event) => {
  try {
    const products: Product[] = await $fetch(
      "https://wb-nuxt-default-rtdb.firebaseio.com/data.json"
    );
    return getNewProducts(products || []);
  } catch (err) {
    console.error("[api/new-products] fetch error", err);
    return [];
  }
});
