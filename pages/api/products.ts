import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../types';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../utils/productStorage';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const products = getProducts();
  res.status(200).json(products);
}

function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const product: Omit<Product, 'id'> = req.body;
  const newProduct = addProduct(product);
  res.status(201).json(newProduct);
}

function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const updatedProduct: Product = req.body;
  updateProduct(updatedProduct);
  res.status(200).json(updatedProduct);
}

function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }
  deleteProduct(id);
  res.status(204).end();
}