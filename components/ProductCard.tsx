import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../types';
import { deleteProduct } from '../utils/productStorage';

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    deleteProduct(product.id);
    onDelete();
    closeModal();
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden shadow-lg">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
          <div className="flex justify-between">
            <Link href={`/products/${product.id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
            <button onClick={openModal} className="text-red-500 hover:underline">
              Delete
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;