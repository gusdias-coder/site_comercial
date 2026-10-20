'use client';

import { useState } from 'react';
import Link from 'next/link';

const key = 'alfawali-next-quote';
export type QuoteItems = Record<string, number>;
export function readQuote(): QuoteItems {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    return typeof saved === 'object' && saved !== null && !Array.isArray(saved) ? saved : {};
  } catch { return {}; }
}
export function saveQuote(items: QuoteItems) { localStorage.setItem(key, JSON.stringify(items)); }

export default function QuoteAdd({ id }: { id: string }) {
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  function add() {
    const items = readQuote();
    items[id] = Math.min(999, (Number(items[id]) || 0) + quantity);
    saveQuote(items); setAdded(true);
  }
  return <div className="quote-add"><label htmlFor={`qty-${id}`}>Quantidade</label><input id={`qty-${id}`} type="number" min="1" max="999" value={quantity} onChange={event => setQuantity(Math.min(999, Math.max(1, Number(event.target.value) || 1)))} /><button className="button button-red" type="button" onClick={add}>Adicionar à cotação <span aria-hidden>↗</span></button>{added && <Link className="text-link" href="/cotacao/">Ver minha cotação →</Link>}</div>;
}
