import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import ProductForm from '../../components/ProductForm';
import { Product } from '../../types';
import { getProducts, updateProduct } from '../../utils/productStorage';
import Layout from '../../components/Layout';
const ProductPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing] = useState(false);
  
    useEffect(() => {
      if (id) {
        const products = getProducts();
        const foundProduct = products.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          router.push('/404');
        }
      }
    }, [id, router]);
  
    const handleUpdate = (updatedProduct: Omit<Product, 'id'>) => {
      if (product) {
        const newProduct = { ...updatedProduct, id: product.id };
        updateProduct(newProduct);
        setProduct(newProduct);
        setIsEditing(false);
      }
    };
  
    if (!product) {
      return <div>Loading...</div>;
    }
  
    return (
      <Layout>
        <SEOHead 
          title={`${product.name} | E-commerce Product`}
          description={product.description}
          ogImage={product.image}
        />
        <div className="max-w-2xl mx-auto">
          {isEditing ? (
            <ProductForm onSubmit={handleUpdate} initialProduct={product} />
          ) : (
            <div className="space-y-4">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update Product
              </button>
            </div>
          )}
        </div>
      </Layout>
    );
  };
  
  export default ProductPage;
  