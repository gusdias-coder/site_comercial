import type { Metadata } from 'next';
import QuoteForm from '@/components/QuoteForm';

export const metadata: Metadata = { title: 'Minha cotação' };
export default function Quote() { return <><section className="page-hero container"><span className="eyebrow">SUA SELEÇÃO</span><h1>Vamos preparar sua cotação.</h1><p>Confira os produtos e as quantidades, depois abra a mensagem no WhatsApp.</p></section><section className="section section-soft"><div className="container"><QuoteForm/></div></section></>; }
