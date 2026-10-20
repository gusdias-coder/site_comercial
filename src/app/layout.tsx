import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@fontsource-variable/manrope';
import '@fontsource/dm-serif-display/400.css';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'ALFAWALI | Produtos e serviços', template: '%s | ALFAWALI' },
  description: 'Terceirização, limpeza e produtos para empresas no Rio Grande do Sul. Conheça as soluções da ALFAWALI.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><a className="skip-link" href="#conteudo">Ir para conteúdo</a><Header/><main id="conteudo">{children}</main><Footer/></body></html>;
}
