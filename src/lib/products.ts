import type { CategoryId } from './site';

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  unit: string;
  demo: boolean;
  fullDescription?: string[];
  images?: { src: string; alt: string }[];
  specifications?: { label: string; value: string }[];
};

// Itens de demonstração; substituir por dados e imagens autorizados pelo fornecedor.
export const products: Product[] = [
  ['coffee-01', 'Café para a sua empresa', 'coffee', 'Exemplo de item para abastecimento da copa. Marca e embalagem a confirmar.', 'embalagem'],
  ['coffee-02', 'Açúcar em sachês', 'coffee', 'Exemplo de produto porcionado para a rotina do café.', 'caixa'],
  ['office-01', 'Papel para escritório', 'office', 'Exemplo de suprimento para atividades administrativas.', 'pacote'],
  ['office-02', 'Materiais de papelaria', 'office', 'Exemplo de itens para organização do ambiente de trabalho.', 'kit'],
  ['sacos-01', 'Saco para lixo', 'sacos', 'Exemplo de material para descarte. Medidas e capacidade a confirmar.', 'pacote'],
  ['sacos-02', 'Saco para coleta seletiva', 'sacos', 'Exemplo de solução para organização e separação de resíduos.', 'pacote'],
  ['copos-01', 'Copo descartável', 'copos', 'Exemplo para servir bebidas. Material e capacidade a confirmar.', 'pacote'],
  ['copos-02', 'Copo para café', 'copos', 'Exemplo de descartável para os intervalos do trabalho.', 'pacote'],
  ['dispensers-01', 'Dispenser de sabonete', 'dispensers', 'Exemplo de acessório para ambientes de higiene.', 'unidade'],
  ['dispensers-02', 'Dispenser de papel', 'dispensers', 'Exemplo de suporte para distribuição de papel.', 'unidade'],
  ['papeis-01', 'Papel toalha', 'papeis', 'Exemplo de insumo para higiene e cuidado diário.', 'pacote'],
  ['papeis-02', 'Papel higiênico', 'papeis', 'Exemplo para reposição em banheiros e áreas de uso comum.', 'pacote'],
  ['quimicos-01', 'Limpador multiuso', 'quimicos', 'Exemplo de produto de limpeza. Aplicações dependem do fabricante.', 'embalagem'],
  ['quimicos-02', 'Detergente', 'quimicos', 'Exemplo de insumo de limpeza. Formulação e volume a confirmar.', 'embalagem'],
  ['equipamentos-01', 'Conjunto de limpeza', 'equipamentos', 'Exemplo de utensílios de apoio para a limpeza.', 'kit'],
  ['equipamentos-02', 'Balde para limpeza', 'equipamentos', 'Exemplo de equipamento para apoio às tarefas de limpeza.', 'unidade'],
].map(([id, name, category, description, unit]) => ({ id, name, category: category as CategoryId, description, unit, demo: true }));

export const getProduct = (id: string) => products.find((product) => product.id === id);
