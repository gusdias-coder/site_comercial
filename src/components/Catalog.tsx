'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductVisual from './ProductVisual';
import { categories } from '@/lib/site';
import { products } from '@/lib/products';

export default function Catalog() {
  const params = useSearchParams();
  const initialCategory = params.get('categoria') || 'todas';
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');
  useEffect(() => setCategory(initialCategory), [initialCategory]);
  const normalize = (value: string) => value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const shown = useMemo(() => products.filter(product => (category === 'todas' || product.category === category) && normalize(product.name + ' ' + product.description).includes(normalize(query))), [category, query]);
  return <div className="catalog-layout"><aside className="catalog-sidebar"><h2>Linhas de produtos</h2><div className="category-filters"><button type="button" aria-pressed={category === 'todas'} onClick={() => setCategory('todas')}>Todas as linhas <span>{products.length}</span></button>{categories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.name}<span>{products.filter(product => product.category === item.id).length}</span></button>)}</div></aside><div className="catalog-main"><div className="catalog-search"><label htmlFor="catalog-search-input">Buscar produto</label><input id="catalog-search-input" type="search" placeholder="Ex.: papel, copo, limpeza..." value={query} onChange={event => setQuery(event.target.value)} /></div><div className="catalog-result-bar"><p role="status" aria-live="polite">{shown.length} {shown.length === 1 ? 'exemplo encontrado' : 'exemplos encontrados'}</p>{(category !== 'todas' || query) && <button type="button" onClick={() => { setCategory('todas'); setQuery(''); }}>Limpar filtros</button>}</div>{shown.length ? <div className="product-grid">{shown.map(product => <Link key={product.id} href={`/produtos/${product.id}/`} className="product-card"><ProductVisual product={product}/><div className="product-card-copy"><span>{categories.find(item => item.id === product.category)?.name}</span><h3>{product.name}</h3><p>{product.description}</p><b>Ver detalhes <span aria-hidden>↗</span></b></div></Link>)}</div> : <div className="no-results"><h3>Nenhum item encontrado.</h3><p>Tente outro termo ou selecione todas as linhas.</p></div>}</div></div>;
}
