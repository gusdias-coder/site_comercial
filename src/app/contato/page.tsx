import type { Metadata } from 'next';
import { company, whatsapp } from '@/lib/site';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = { title: 'Contato' };
export default function Contact() {
  return <><section className="page-hero container"><span className="eyebrow">VAMOS CONVERSAR</span><h1>Conte o que sua empresa precisa.</h1><p>Produtos, serviços ou uma nova parceria. O atendimento é o primeiro passo.</p></section><section className="section section-soft"><div className="container contact-grid"><div className="contact-info"><span className="eyebrow">ATENDIMENTO DIRETO</span><h2>Estamos no WhatsApp.</h2><a className="phone-link" href={whatsapp('Olá! Gostaria de falar com a ALFAWALI.')} target="_blank" rel="noopener noreferrer">{company.phoneDisplay}</a><p>Converse sobre produtos, disponibilidade e serviços para sua empresa.</p><p><strong>Área de atendimento</strong><br/>Rio Grande do Sul</p><a className="text-link" href={whatsapp('Olá! Gostaria de solicitar o catálogo completo da ALFAWALI.')} target="_blank" rel="noopener noreferrer">Solicitar catálogo completo ↗</a></div><ContactForm/></div></section></>;
}
