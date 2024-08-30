import React, { useState, useCallback } from 'react';
import Pagination from './Pagination';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onProductDelete: (id: string) => void;
}

const ITEMS_PER_PAGE = 9;

const ProductList: React.FC<ProductListProps> = ({ products, onProductDelete }) => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.category.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = useCallback((id: string) => {
    onProductDelete(id);
    if (paginatedProducts.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [onProductDelete, paginatedProducts.length, currentPage]);

  return (
    <div>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Filter products..."
          className="border p-2 rounded"
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border p-2 rounded"
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;