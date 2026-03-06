export interface Product {
  id: number;
  name: string;
}

export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: Product[] = Array.from({ length: 42 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`
      }));
      resolve(data);
    }, 800);
  });
};
