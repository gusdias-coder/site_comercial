import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/ProductGallery';
import QuoteAdd from '@/components/QuoteAdd';
import { categories, whatsapp } from '@/lib/site';
import { getProduct, products } from '@/lib/products';

export function generateStaticParams() { return products.map(product => ({ id: product.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const product = getProduct((await params).id);
  return { title: product?.name || 'Produto' };
}
export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const product = getProduct((await params).id);
  if (!product) notFound();
  const category = categories.find(item => item.id === product.category);
  const specifications = [
    { label: 'Marca', value: 'A confirmar' },
    { label: 'Tamanho / dimensões', value: 'A confirmar' },
    { label: 'Peso', value: 'A confirmar' },
    { label: 'Embalagem', value: 'A confirmar' },
    { label: 'Unidade de cotação', value: product.unit },
    ...(product.specifications || []),
  ];
  return <><section className="container product-detail"><nav className="breadcrumbs" aria-label="Caminho"><Link href="/produtos/">Catálogo</Link><span aria-hidden>/</span><span>{product.name}</span></nav><div className="product-detail-grid"><ProductGallery product={product}/><div className="product-detail-copy"><span className="eyebrow">{category?.name.toUpperCase()} · ITEM DEMONSTRATIVO</span><h1>{product.name}</h1><p>{product.description}</p>{product.fullDescription?.length ? product.fullDescription.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>Esta página está preparada para receber a descrição completa, medidas, peso, embalagem e imagens reais após confirmação do produto pela ALFAWALI.</p>}<div className="spec-list"><h2>Informações do produto</h2>{specifications.map(spec => <div key={spec.label}><span>{spec.label}</span><strong>{spec.value}</strong></div>)}</div><QuoteAdd id={product.id}/><p className="product-price-note">Preço, pagamento e entrega serão combinados com a equipe comercial.</p></div></div><div className="detail-end"><Link className="text-link" href="/produtos/">← Voltar ao catálogo</Link><a className="text-link" href={whatsapp(`Olá! Gostaria de saber mais sobre ${product.name} da ALFAWALI.`)} target="_blank" rel="noopener noreferrer">Perguntar sobre este produto ↗</a></div></section></>;
}
