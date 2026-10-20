export const company = {
  name: 'ALFAWALI',
  region: 'Rio Grande do Sul',
  whatsapp: '5551991005271',
  phoneDisplay: '(51) 99100-5271',
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (path: string) => `${basePath}/${path.replace(/^\//, '')}`;
export const whatsapp = (message: string) => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;

export const categories = [
  { id: 'coffee', name: 'Coffee', line: 'Para as pausas da rotina.' },
  { id: 'office', name: 'Office', line: 'Tudo em ordem no trabalho.' },
  { id: 'sacos', name: 'Sacos para lixo', line: 'Descarte e organização.' },
  { id: 'copos', name: 'Copos', line: 'Praticidade para servir.' },
  { id: 'dispensers', name: 'Dispensers', line: 'Higiene ao alcance.' },
  { id: 'papeis', name: 'Papéis', line: 'Essenciais do cotidiano.' },
  { id: 'quimicos', name: 'Químicos', line: 'Limpeza para cada ambiente.' },
  { id: 'equipamentos', name: 'Equipamentos', line: 'Ferramentas para a operação.' },
] as const;
export type CategoryId = (typeof categories)[number]['id'];

export const services = [
  { number: '01', name: 'Terceirização de mão de obra', description: 'Conte sua necessidade. A equipe conversa com você para definir atividades, local, rotina e condições da proposta.' },
  { number: '02', name: 'Limpeza de empresas e ambientes', description: 'Serviços de limpeza para empresas, prédios e domicílios, com escopo definido conforme cada demanda.' },
  { number: '03', name: 'Apoio à operação', description: 'Apoio administrativo e serviços ligados à rotina de empresas, sujeitos à avaliação comercial.' },
] as const;
