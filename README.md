# Nexhub API

Backend acadêmico em Express + TypeScript, Prisma 7 e PostgreSQL no Supabase.

## Executar

1. `npm ci`
2. Preencha `.env` com base no `.env.example`, incluindo certificado e segredo JWT.
3. `npm run db:generate` e `npm run db:migrate`
4. `npm run db:seed` para criar dados fictícios.
5. `npm run db:check` e `npm run dev`

API: `http://localhost:3333/api`. Saúde: `http://localhost:3333/health`.
No frontend separado, use `VITE_API_URL=http://localhost:3333/api`.
Nunca coloque a conexão PostgreSQL ou JWT_SECRET no frontend.

O seed gera uma senha em `.env.demo`, ignorado pelo Git. Reexecutá-lo preserva
registros, senhas e edições existentes. Apagar esse arquivo não redefine as senhas.

## Verificação

`npm run build`, `npm test` e `npm run test:integration`.
Os testes integrados usam o banco configurado, criam contas temporárias com domínio
`integration.test` e removem exclusivamente essas contas ao finalizar. Use uma base
de desenvolvimento, não uma base real de produção.

## Guia da equipe

Leia [o relatório e roteiro de demonstração](docs/integracao-2026-10-20.md).
Ele explica as regras, endpoints, contas fictícias, cronograma e pendências.

As tabelas estão no schema privado `nexhub` no Supabase. Selecione esse schema no
painel para vê-las. O frontend acessa a API Express, que verifica identidade, papel
e participação em cada operação; não exponha as tabelas pela Data API.
