'use client';

import { useState } from 'react';
import { whatsapp } from '@/lib/site';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [interest, setInterest] = useState('Produtos e suprimentos');
  const [details, setDetails] = useState('');
  const [review, setReview] = useState('');
  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReview(`Olá! Meu nome é ${name.trim()}.\nEmpresa: ${company.trim() || 'Não informada'}\nCidade: ${city.trim()}\nTenho interesse em: ${interest}\nDetalhes: ${details.trim() || 'Gostaria de receber mais informações.'}`);
  }
  return <div className="contact-form"><span className="eyebrow">FACILITE O PRIMEIRO CONTATO</span><h2>Como podemos ajudar?</h2><p>Preencha os campos e confira sua mensagem antes de abrir o WhatsApp.</p><form onSubmit={prepare}><label>Seu nome *<input required maxLength={100} autoComplete="name" value={name} onChange={event => setName(event.target.value)}/></label><label>Empresa<input maxLength={100} autoComplete="organization" value={company} onChange={event => setCompany(event.target.value)}/></label><label>Cidade no RS *<input required maxLength={100} autoComplete="address-level2" value={city} onChange={event => setCity(event.target.value)}/></label><label>Tenho interesse em<select value={interest} onChange={event => setInterest(event.target.value)}><option>Produtos e suprimentos</option><option>Solicitar catálogo completo</option><option>Terceirização de mão de obra</option><option>Serviços de limpeza</option><option>Apoio à operação</option><option>Outro assunto</option></select></label><label>Conte um pouco mais<textarea rows={4} maxLength={800} value={details} onChange={event => setDetails(event.target.value)}/></label><button className="button button-red" type="submit">Preparar contato ↗</button></form>{review && <div className="message-review"><h3>Confira sua mensagem</h3><pre>{review}</pre><a className="button button-dark" href={whatsapp(review)} target="_blank" rel="noopener noreferrer">Abrir WhatsApp ↗</a><button className="text-link" type="button" onClick={() => setReview('')}>Voltar e editar</button></div>}<small>Seus dados não são armazenados em um banco de dados pelo site.</small></div>;
}
