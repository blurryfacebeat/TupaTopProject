export class ProductModel {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  credit: number;
  averageRating: number;
  description: string;
  advantages: string;
  disadvantages: string;
  categories: string[];
  tags: string;
  characteristics: Record<string, string>;
}
