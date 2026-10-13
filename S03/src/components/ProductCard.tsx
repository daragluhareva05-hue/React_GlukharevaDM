export type Product = {
  id: number;
  title: string;
  price: number;
  inStock: boolean;
};

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p>{product.price} ₽</p>
      <p>{product.inStock ? 'В наличии' : 'Нет в наличии'}</p>
      <button disabled={!product.inStock}>В корзину</button>
    </div>
  );
}

export default ProductCard;
