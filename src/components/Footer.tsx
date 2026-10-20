import Link from 'next/link';
import { asset, company, whatsapp } from '@/lib/site';

export default function Footer() {
  return <footer className="footer"><div className="container footer-grid">
    <div><img src={asset('images/logo.png')} alt="ALFAWALI" width="130" height="76" /><p>Produtos e serviços para a rotina da sua empresa no Rio Grande do Sul.</p></div>
    <div><strong>Explore</strong><Link href="/servicos/">Terceirização</Link><Link href="/produtos/">Catálogo de produtos</Link><Link href="/empresa/">A empresa</Link></div>
    <div><strong>Atendimento</strong><a href={whatsapp('Olá! Gostaria de falar com a ALFAWALI.')} target="_blank" rel="noopener noreferrer">WhatsApp {company.phoneDisplay}</a><Link href="/contato/">Entre em contato</Link><span>Rio Grande do Sul</span></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} ALFAWALI</span><span>Apresentação demonstrativa · Valores sob consulta</span></div></footer>;
}
