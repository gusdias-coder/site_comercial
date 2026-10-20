'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { products } from '@/lib/products';
import { whatsapp } from '@/lib/site';
import { readQuote, saveQuote, type QuoteItems } from './QuoteAdd';

export default function QuoteForm() {
  const [items, setItems] = useState<QuoteItems>({});
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => setItems(readQuote()), []);
  const selected = products.filter(product => Number(items[product.id]) > 0);
  function update(id: string, quantity: number) {
    const next = { ...items };
    if (quantity <= 0) delete next[id]; else next[id] = Math.min(999, quantity);
    setItems(next); saveQuote(next);
  }
  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected.length) return;
    setMessage(`Olá! Gostaria de solicitar uma cotação da ALFAWALI.\n\nItens:\n${selected.map(product => `• ${product.name} — ${items[product.id]} ${product.unit}(s)`).join('\n')}\n\nNome: ${name.trim()}\nEmpresa: ${company.trim() || 'Não informada'}\nCidade: ${city.trim()}\nObservações: ${notes.trim() || 'Nenhuma'}`);
  }
  return <div className="quote-layout"><div className="quote-summary"><h2>Itens selecionados</h2>{selected.length ? selected.map(product => <div className="quote-row" key={product.id}><div><Link href={`/produtos/${product.id}/`}>{product.name}</Link><small>{product.unit} · produto demonstrativo</small></div><label>Qtd.<input type="number" min="0" max="999" value={items[product.id]} onChange={event => update(product.id, Number(event.target.value) || 0)}/></label><button type="button" aria-label={`Remover ${product.name}`} onClick={() => update(product.id, 0)}>×</button></div>) : <div className="quote-empty"><p>Sua seleção está vazia.</p><Link className="button button-dark" href="/produtos/">Explorar produtos ↗</Link></div>}</div><div className="quote-form-panel"><span className="eyebrow">SEUS DADOS</span><h2>Prepare a mensagem.</h2><p>Revise antes de abrir o WhatsApp. O site não envia nem armazena seus dados pessoais.</p><form onSubmit={prepare}><label>Seu nome *<input required maxLength={100} value={name} onChange={event => setName(event.target.value)} autoComplete="name"/></label><label>Empresa<input maxLength={100} value={company} onChange={event => setCompany(event.target.value)} autoComplete="organization"/></label><label>Cidade no RS *<input required maxLength={100} value={city} onChange={event => setCity(event.target.value)} autoComplete="address-level2"/></label><label>Observações<textarea maxLength={800} rows={3} value={notes} onChange={event => setNotes(event.target.value)}/></label><button className="button button-red" type="submit" disabled={!selected.length}>Preparar cotação ↗</button></form>{message && <div className="message-review"><h3>Confira sua mensagem</h3><pre>{message}</pre><a className="button button-dark" href={whatsapp(message)} target="_blank" rel="noopener noreferrer">Abrir WhatsApp ↗</a><button className="text-link" type="button" onClick={() => setMessage('')}>Voltar e editar</button></div>}</div></div>;
}
