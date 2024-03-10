export interface Product {
  id: string;
  brand?: string;
  price: number;
  product: string;
}

export interface ProductProps {
  result: Array<Product>;
}
