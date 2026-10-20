# ALFAWALI — apresentação em Next.js

Projeto de apresentação com Início, Terceirização, Produtos, Empresa, Contato e Cotação. O catálogo contém 16 exemplos nas oito linhas informadas. Cada exemplo tem página de detalhes preparada para medidas, peso, descrição e imagens reais. A cotação é revisada pelo visitante e aberta no WhatsApp; não há pagamento nem envio automático.

## Rodar localmente

Com Node.js 24 e pnpm 11:

```sh
pnpm install --ignore-workspace
pnpm dev
```

Abra `http://127.0.0.1:3000`. Para conferir a exportação estática:

```sh
pnpm build
```

O resultado fica em `out/`. O workflow do repositório configura o caminho `/alfawali-site` para GitHub Pages.

## Conteúdo a completar

- `src/lib/site.ts`: informações da empresa, serviços e categorias.
- `src/lib/products.ts`: substitua os exemplos por produtos reais. Preserve os IDs para manter links e cotações.
- `public/images/`: use imagens próprias ou autorizadas.

Antes da apresentação comercial definitiva, confirmar os produtos, características, logos de clientes e textos com os sócios. Os campos ainda não recebidos são mostrados como “A confirmar”. Contatos, preços e entrega são combinados pela equipe comercial no Rio Grande do Sul.
