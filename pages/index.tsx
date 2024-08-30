import { useState, useEffect, useCallback } from 'react';
import SEOHead from '../components/SEOHead';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { Product } from '../types';
import { getProducts, addProduct } from '../utils/productStorage';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = addProduct(product);
    setProducts([...products, newProduct]);
    setShowForm(false);
  };

    const handleProductDelete = useCallback((id: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  }, []);

  return (
    <Layout>
      <SEOHead 
        title="E-commerce Product Listing" 
        description="Browse our wide range of products in our e-commerce store."
      />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Product Listing</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? 'Hide Form' : 'Add New Product'}
        </button>
        {showForm && <ProductForm onSubmit={handleAddProduct} />}
        <ProductList products={products} onProductDelete={handleProductDelete} />
      </div>
    </Layout>
  );
};

export default Home;
 