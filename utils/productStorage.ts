import { Product } from '../types';

const STORAGE_KEY = 'ecommerce_products';

export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return [];
  const storedProducts = localStorage.getItem(STORAGE_KEY);
  return storedProducts ? JSON.parse(storedProducts) : [];
};

export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now().toString() };
  const updatedProducts = [...products, newProduct];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  return newProduct;
};

export const updateProduct = (updatedProduct: Product): void => {
  const products = getProducts();
  const updatedProducts = products.map(p => 
    p.id === updatedProduct.id ? updatedProduct : p
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
};

export const deleteProduct = (id: string): void => {
  const products = getProducts();
  const updatedProducts = products.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
};