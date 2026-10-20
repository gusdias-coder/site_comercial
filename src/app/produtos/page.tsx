import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import Catalog from '@/components/Catalog';
import { whatsapp } from '@/lib/site';

export const metadata: Metadata = { title: 'Catálogo de produtos' };
export default function Products() {
  return <><section className="page-hero container catalog-hero"><div><span className="eyebrow">CATÁLOGO ALFAWALI</span><h1>Produtos para cada parte da sua rotina.</h1><p>Explore as linhas, abra os detalhes e prepare sua seleção para a equipe comercial.</p></div><Link className="button button-outline" href="/cotacao/">Minha cotação ↗</Link></section><section className="section section-soft"><div className="container"><div className="demo-notice"><strong>Catálogo demonstrativo.</strong> Produtos, imagens, tamanhos, pesos, marcas e disponibilidade serão confirmados pela ALFAWALI antes da venda.</div><Suspense fallback={<p>Carregando catálogo...</p>}><Catalog/></Suspense></div></section><section className="contact-band"><div className="container contact-band-grid"><div><span className="eyebrow">TELEVENDAS</span><h2>Precisa de outro produto?</h2><p>Solicite o catálogo completo pelo WhatsApp.</p></div><a className="button button-light" href={whatsapp('Olá! Gostaria de solicitar o catálogo completo de produtos da ALFAWALI.')} target="_blank" rel="noopener noreferrer">Pedir catálogo ↗</a></div></section></>;
}
