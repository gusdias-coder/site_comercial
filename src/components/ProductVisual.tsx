import { asset } from '@/lib/site';
import type { Product } from '@/lib/products';

export default function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
  if (product.images?.length) {
    return <div className={`product-visual ${large ? 'large' : ''}`}><img src={asset(product.images[0].src)} alt={product.images[0].alt} /></div>;
  }
  return <div className={`product-visual visual-${product.category} ${large ? 'large' : ''}`} role="img" aria-label={`Ilustração demonstrativa da linha ${product.category}`}><span className="visual-shape" aria-hidden="true"/><span className="visual-line">{product.category.replace('-', ' ')}</span></div>;
}
