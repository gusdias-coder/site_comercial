'use client';

import { useState } from 'react';
import ProductVisual from './ProductVisual';
import type { Product } from '@/lib/products';
import { asset } from '@/lib/site';

export default function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  if (!product.images?.length) return <><ProductVisual product={product} large/><p className="image-note">Ilustração demonstrativa. Fotos reais poderão ser incluídas com o cadastro do produto.</p></>;
  return <div className="product-gallery"><div className="gallery-main"><img src={asset(product.images[selected].src)} alt={product.images[selected].alt}/></div><div className="gallery-thumbs">{product.images.map((image, index) => <button type="button" key={image.src} aria-label={`Ver imagem ${index + 1}: ${image.alt}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><img src={asset(image.src)} alt=""/></button>)}</div></div>;
}
