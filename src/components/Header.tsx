'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { asset, whatsapp } from '@/lib/site';

const links = [
  { href: '/', label: 'Início' },
  { href: '/servicos/', label: 'Terceirização' },
  { href: '/produtos/', label: 'Produtos' },
  { href: '/empresa/', label: 'Empresa' },
  { href: '/contato/', label: 'Contato' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    function escape(event: KeyboardEvent) { if (event.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);
  return <header className="site-header">
    <div className="container nav-inner">
      <Link href="/" className="brand" aria-label="ALFAWALI, ir para início"><img src={asset('images/logo.png')} alt="ALFAWALI" width="128" height="76" /></Link>
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegação principal" id="main-nav">
        {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? 'page' : undefined}>{link.label}</Link>)}
      </nav>
      <a className="nav-cta" href={whatsapp('Olá! Gostaria de conhecer as soluções da ALFAWALI.')} target="_blank" rel="noopener noreferrer">Falar com a equipe <span aria-hidden>↗</span></a>
      <button className="menu-button" type="button" aria-controls="main-nav" aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}><span aria-hidden>{open ? '×' : '☰'}</span></button>
    </div>
  </header>;
}
