import type { DState, State } from './index.types';

/**
 *  Get Products
 */

// Data
interface ProductData {
  id: string;
  image: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
}

// State
interface ProductState extends DState<ProductData[]> {}

/**
 *  Add Product
 */

// Payload
interface AddProductPayload {
  image: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_file: File;
}

// State
interface AddProductState extends State {}

/**
 *  Delete Product
 */

// Payload
interface DeleteProductPayload {
  image: string;
  slug: string;
}

// State
interface DeleteProductState extends State {}
