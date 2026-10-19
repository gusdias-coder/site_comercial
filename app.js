(() => {
'use strict';
const WA = '5551991005271', KEY = 'alfawali.quote.v1', TTL = 30 * 864e5, MAX_ITEMS = 30, MAX_URL = 1800;
const CATS = [['quimicos','Químicos'],['papeis','Papéis'],['copos','Copos'],['equipamentos','Equipamentos'],['coffee','Coffee'],['office','Office'],['sacos','Sacos para lixo'],['dispensers','Dispensers']];
// Dados demonstrativos. Substitua por produtos aprovados (demo:false) antes de publicar.
const PRODUCTS = [
 {id:'quimicos-01',name:'Limpador multiuso',cat:'quimicos',unit:'embalagem',pack:'Apresentação a confirmar',desc:'Exemplo de produto de limpeza. Aplicações e diluição dependem do fabricante.'},
 {id:'papeis-01',name:'Papel toalha',cat:'papeis',unit:'pacote',pack:'Apresentação a confirmar',desc:'Exemplo de insumo para higiene e cuidado diário.'},
 {id:'copos-01',name:'Copo descartável',cat:'copos',unit:'pacote',pack:'Apresentação a confirmar',desc:'Exemplo para servir bebidas. Material e capacidade a confirmar.'},
 {id:'equipamentos-01',name:'Pano de limpeza',cat:'equipamentos',unit:'unidade',pack:'Apresentação a confirmar',desc:'Exemplo de utensílio para a rotina de limpeza.'},
 {id:'coffee-01',name:'Café para coador',cat:'coffee',unit:'pacote',pack:'Apresentação a confirmar',desc:'Exemplo de item para copa. Marca e gramatura a confirmar.'},
 {id:'office-01',name:'Papel para escritório',cat:'office',unit:'pacote',pack:'Apresentação a confirmar',desc:'Exemplo de suprimento para atividades administrativas.'},
 {id:'sacos-01',name:'Saco para lixo',cat:'sacos',unit:'pacote',pack:'Apresentação a confirmar',desc:'Exemplo de saco para lixo. Capacidade e espessura a confirmar.'},
 {id:'dispensers-01',name:'Dispenser de papel toalha',cat:'dispensers',unit:'unidade',pack:'Apresentação a confirmar',desc:'Exemplo de dispenser. Modelo e instalação a confirmar.'}
];
const $ = id => document.getElementById(id);
const norm = s => String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const catName = id => (CATS.find(c => c[0] === id) || [,''])[1];
const byId = id => PRODUCTS.find(p => p.id === id);
const el = (tag, text, cls) => { const e = document.createElement(tag); if (text != null) e.textContent = text; if (cls) e.className = cls; return e; };

// ---- Lista (somente IDs e quantidades no localStorage) ----
let quote = [];
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!d || d.version !== 1 || Date.now() - d.updatedAt > TTL || !Array.isArray(d.items)) return;
    quote = d.items.filter(i => byId(i.productId) && Number.isInteger(i.quantity) && i.quantity >= 1 && i.quantity <= 999).slice(0, MAX_ITEMS);
  } catch (e) { quote = []; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify({version:1, updatedAt:Date.now(), items:quote})); } catch (e) {}
}
function add(id, qty) {
  const i = quote.find(x => x.productId === id);
  if (i) i.quantity = Math.min(999, i.quantity + qty);
  else if (quote.length >= MAX_ITEMS) return 'A lista aceita até ' + MAX_ITEMS + ' itens distintos.';
  else quote.push({productId:id, quantity:qty});
  save(); renderQuote(); return '';
}

// ---- Catálogo ----
const grid = $('grid'), q = $('q'), cat = $('cat'), sort = $('sort');
cat.append(new Option('Todas as categorias', ''));
CATS.forEach(c => cat.append(new Option(c[1], c[0])));
const params = new URLSearchParams(location.search);
if (params.get('q')) q.value = params.get('q').slice(0,100);
if (CATS.some(c => c[0] === params.get('cat'))) cat.value = params.get('cat');
if (params.get('ord') === 'za') sort.value = 'za';

function renderGrid() {
  const t = norm(q.value);
  let list = PRODUCTS.filter(p => (!cat.value || p.cat === cat.value) && (!t || norm([p.name,p.id,p.brand].join(' ')).includes(t)));
  list.sort((a,b) => a.name.localeCompare(b.name,'pt-BR') * (sort.value === 'za' ? -1 : 1));
  grid.replaceChildren();
  list.forEach(p => {
    const c = el('article', null, 'pcard');
    c.append(el('div','Exemplo ilustrativo','ph'), el('p', catName(p.cat)), el('h3', p.name), el('p', 'Por ' + p.unit + ' · preço sob consulta'));
    const row = el('div', null, 'row');
    const d = el('button','Ver detalhes','btn ghost'); d.type = 'button'; d.onclick = () => openDetail(p);
    const a = el('button','Adicionar','btn'); a.type = 'button'; a.onclick = () => { add(p.id,1); announce(p.name + ' adicionado à cotação.'); };
    row.append(d, a); c.append(row); grid.append(c);
  });
  $('result').textContent = list.length ? list.length + (list.length === 1 ? ' produto encontrado.' : ' produtos encontrados.') : 'Nenhum produto encontrado' + (q.value ? ' para "' + q.value.slice(0,100) + '"' : '') + '. Limpe os filtros ou fale com a equipe.';
  const p = new URLSearchParams();
  if (q.value) p.set('q', q.value); if (cat.value) p.set('cat', cat.value); if (sort.value !== 'az') p.set('ord', sort.value);
  history.replaceState(null, '', p.toString() ? '?' + p : location.pathname + location.hash);
}
function announce(t) { $('result').textContent = t; }
[q, cat, sort].forEach(e => e.addEventListener('input', renderGrid));
$('clear').onclick = () => { q.value = ''; cat.value = ''; sort.value = 'az'; renderGrid(); };

// ---- Detalhe ----
let current = null;
function openDetail(p) {
  current = p; $('dTitle').textContent = p.name; $('dImg').textContent = 'Exemplo ilustrativo';
  $('dMeta').textContent = catName(p.cat) + ' · ' + p.pack + ' · Por ' + p.unit; $('dDesc').textContent = p.desc;
  $('dQty').value = 1; $('dErr').textContent = ''; $('detail').showModal();
}
$('dAdd').onclick = () => {
  const n = Number($('dQty').value);
  if (!Number.isInteger(n) || n < 1 || n > 999) { $('dErr').textContent = 'Informe uma quantidade inteira entre 1 e 999.'; return; }
  const err = add(current.id, n); if (err) { $('dErr').textContent = err; return; }
  $('detail').close(); announce(current.name + ' adicionado à cotação.');
};

// ---- Cotação ----
function renderQuote() {
  $('count').textContent = quote.length;
  const ul = $('qList'); ul.replaceChildren();
  $('qEmpty').hidden = quote.length > 0; $('qForm').hidden = !quote.length; $('clearList').hidden = !quote.length;
  quote.forEach(i => {
    const p = byId(i.productId), li = el('li');
    const n = el('span', p.name + ' (por ' + p.unit + ')');
    const inp = el('input'); inp.type = 'number'; inp.min = 1; inp.max = 999; inp.value = i.quantity; inp.setAttribute('aria-label','Quantidade de ' + p.name);
    inp.onchange = () => { const v = Number(inp.value); if (Number.isInteger(v) && v >= 1 && v <= 999) { i.quantity = v; save(); } else inp.value = i.quantity; };
    const rm = el('button','Remover'); rm.type = 'button'; rm.setAttribute('aria-label','Remover ' + p.name);
    rm.onclick = () => { quote = quote.filter(x => x !== i); save(); renderQuote(); };
    li.append(n, inp, rm); ul.append(li);
  });
}
function openQuote() { $('review').hidden = true; $('qForm').hidden = !quote.length; renderQuote(); $('quote').showModal(); }
$('openQuote').onclick = openQuote;
document.querySelectorAll('[data-open-quote]').forEach(b => b.onclick = openQuote);
document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => b.closest('dialog').close());
document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));
$('clearList').onclick = () => { quote = []; save(); renderQuote(); };

function buildMessage(name, comp, city, obs) {
  const L = ['Olá! Esta é uma solicitação de orçamento preparada pelo site da ALFAWALI (prévia demonstrativa).', '', 'Nome: ' + name];
  if (comp) L.push('Empresa: ' + comp);
  L.push('Cidade: ' + city, '', 'Itens:');
  quote.forEach(i => { const p = byId(i.productId); L.push('- ' + i.quantity + ' ' + p.unit + (i.quantity > 1 ? '(s)' : '') + ' de ' + p.name + ' [' + p.id + ']'); });
  if (obs) L.push('', 'Observações: ' + obs);
  return L.join('\n');
}
$('qForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('fName').value.trim(), comp = $('fComp').value.trim(), city = $('fCity').value.trim(), obs = $('fObs').value.trim();
  if (name.length < 2) return fail('Informe seu nome (mínimo 2 letras).', 'fName');
  if (city.length < 2) return fail('Informe sua cidade no Rio Grande do Sul.', 'fCity');
  $('qErr').textContent = '';
  const text = buildMessage(name, comp, city, obs), url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text), long = url.length > MAX_URL;
  $('msg').value = text; $('longNote').hidden = !long;
  $('send').href = long ? 'https://wa.me/' + WA : url;
  $('state').textContent = 'Mensagem preparada. Revise e envie no WhatsApp.';
  $('qForm').hidden = true; $('review').hidden = false; $('msg').focus();
});
function fail(m, id) { $('qErr').textContent = m; $(id).focus(); }
$('back').onclick = () => { $('review').hidden = true; $('qForm').hidden = false; };
$('copy').onclick = async () => {
  try { await navigator.clipboard.writeText($('msg').value); $('state').textContent = 'Mensagem copiada.'; }
  catch (e) { $('msg').removeAttribute('readonly'); $('msg').select(); $('state').textContent = 'Não foi possível copiar. Selecione o texto e copie manualmente.'; }
};

// ---- Atendimento, menu, links ----
$('cityForm').addEventListener('submit', e => {
  e.preventDefault();
  $('cityMsg').textContent = 'Consulte a disponibilidade para ' + $('city').value.trim() + '. A equipe confirma cobertura, prazo e condições na proposta.';
});
$('menuBtn').onclick = () => { const o = $('nav').classList.toggle('open'); $('menuBtn').setAttribute('aria-expanded', o); };
$('nav').addEventListener('click', e => { if (e.target.tagName === 'A') { $('nav').classList.remove('open'); $('menuBtn').setAttribute('aria-expanded', 'false'); } });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { $('nav').classList.remove('open'); $('menuBtn').setAttribute('aria-expanded', 'false'); } });
const hello = encodeURIComponent('Olá! Gostaria de conversar sobre os produtos e serviços da ALFAWALI.');
$('wa').href = 'https://wa.me/' + WA + '?text=' + hello;
$('svcLink').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Olá! Gostaria de solicitar a avaliação de um serviço de terceirização de mão de obra.');
$('svcLink').target = '_blank'; $('svcLink').rel = 'noopener';

load(); renderGrid(); renderQuote();
})();
