# Nexhub — integração e roteiro da equipe

Atualizado em 20/10/2026.

## Resultado

As tabelas foram criadas por uma migration versionada no schema `nexhub` do
Supabase. O backend agora lê e grava com Prisma, TLS e certificado verificado.
O frontend em `nexthub frontend/Fron-pi` usa a API. Nenhuma credencial de banco
foi colocada no frontend.

O feed usa registros persistidos. Conectar cria um convite que depende do aceite
da outra pessoa. Mensagens e reuniões são restritas aos participantes.
Esta etapa não conclui todos os 98 requisitos da especificação final: veja as
pendências e datas abaixo.

## Iniciar e experimentar

No terminal de `C:\Users\Fernando\Documents\nexhub api`, execute `npm run dev`.
No terminal de `C:\Users\Fernando\Documents\nexthub frontend\Fron-pi`, execute
`npm run dev`. Abra `http://localhost:5173`.
Se mudar a origem/porta, ajuste `FRONTEND_ORIGIN` no backend e `VITE_API_URL` no
frontend e reinicie. A URL PostgreSQL fica exclusivamente no backend.

### Contas fictícias

Todas usam a senha `DEMO_PASSWORD` do arquivo local `.env.demo` no backend.
Não copie esse arquivo para Git ou documentação. A senha não aparece nos logs.

| Login | Papel |
|---|---|
| `admin@nexhub.example` | Administrador |
| `investidor@nexhub.example` | Investidor |
| `mentora@nexhub.example` | Mentora |
| `ambos@nexhub.example` | Investidor e mentor |
| `colheita-digital@nexhub.example` | Startup Colheita Digital |
| `vortice-capital@nexhub.example` | Startup Vórtice Capital |
| `nuvia-health@nexhub.example` | Startup Nuvia Health |
| `edla@nexhub.example` | Startup Edla |

Há uma conexão aceita, uma mensagem e uma reunião proposta entre Colheita Digital
e a investidora de demonstração. Os valores e textos são fictícios. Os links
`example.com` de Pitch são marcadores, não apresentações reais.

### Roteiro de demonstração

1. Entre como investidor. Explore filtros, favoritos e recomendações. Recarregue
   a página para conferir persistência dos favoritos e veja os motivos do match.
2. Abra um perfil e envie uma apresentação com convite. Entre como a startup em
   outro navegador/sessão e aceite em Minha área. Antes do aceite, materiais
   privados ficam ocultos.
3. Abra a conversa e envie uma mensagem. Use Atualizar na outra sessão. O chat
   consulta a API; ainda não há atualização automática/WebSocket.
4. Proponha uma reunião futura. A contraparte confirma. Tente confirmar outra no
   mesmo intervalo para verificar a rejeição por conflito de agenda.
5. Cadastre uma conta nova. Ela começa pendente. Complete a apresentação com pelo
   menos 50 caracteres. Entre como administrador e registre análise com justificativa.
6. Entre como startup para ver profissionais recomendados. Para testar mentoria,
   indique necessidades compatíveis, salve e aprove novamente o perfil.

O administrador não pode acessar conversas alheias pelo endpoint de mensagens.
O painel é uma interface funcional inicial, que o design pode refinar preservando
os contratos da API.

## Comportamento das telas

| Tela | O que faz |
|---|---|
| Cadastro startup | Salva conta, hash de senha, aceite e perfil pendente com setores, estágio e captação |
| Cadastro profissional | Escolhe investidor, mentor ou ambos; registra interesses, ticket e/ou especialidades e horas |
| Login | Valida senha real; sessão de 1 dia ou até 7 dias com manter conectado |
| Recuperação | Envia link se SMTP estiver configurado; informa indisponibilidade caso contrário |
| Redefinição | Valida token do link, de uso único e 30 minutos; invalida sessões anteriores |
| Feed | Lista aprovados ativos, filtra startups, mostra favoritos e recomendações paginadas |
| Perfil detalhado | Mostra dados e controla acesso ao Pitch/Canvas |
| Meu perfil | Edita apresentação/localização e, na startup, necessidades, site, Pitch, Canvas e visibilidade; retorna à análise |
| Conexões | Envia, aceita, recusa ou cancela convite; encerra conexão aceita |
| Conversa | Consulta e envia mensagens na conexão ativa |
| Agenda | Propõe, confirma, cancela com motivo e conclui reunião após término |
| Notificações | Lista eventos e marca como lidos |
| Administração | Aprova/reprova pendentes com justificativa e mostra contagens básicas |
| Uso e privacidade | Explica a demonstração e os dados utilizados; governança completa permanece pendente |

Google/LinkedIn/SMS não estão configurados. Botões sociais ficam desabilitados e
SMS não é oferecido no formulário. Planos gratuitos/pagos com cobrança simulada
continuam no escopo futuro; não foram implementados nesta etapa.

## Motor de matchmaking

`src/domain/matchmaking.ts` contém uma função pura, explicável e testada.

| Critério | Investimento | Mentoria |
|---|---:|---:|
| Pelo menos um setor em comum | 40 | 40 |
| Estágio aceito pelo profissional | 25 | 25 |
| Startup busca investimento | 10 | — |
| Ticket mínimo pode participar da captação | 25 | — |
| Especialidades cobrem necessidades | — | Até 25, proporcional |
| Disponibilidade informada | — | 10 |

Papéis e necessidades precisam permitir a finalidade. Na atuação dupla, vale a
maior pontuação. Recomendações mostram score >= 40, ordenado, sem pares já pendentes
ou conectados. O score não é probabilidade de sucesso ou investimento.

Captação significa rodada total: um investidor pode participar com apenas uma parte.
A regra financeira verifica se o ticket mínimo não excede a captação conhecida.
Na faixa aberta o teto é desconhecido. A equipe deve avaliar essa regra com exemplos.
Todos os candidatos elegíveis são pontuados em memória antes da paginação; uma
base grande exigirá pré-filtros/cache ou outra estratégia.

Não há modelo de IA treinado nem aprendizado por feedback nesta versão.

## Regras para documentação e implementação

- O cadastro não aceita ADMIN; o papel é consultado no banco a cada requisição.
- Novos perfis e edições ficam pendentes. Não há versionamento que mantenha a
  versão anterior publicada durante análise.
- Há uma conexão por par. Após recusa/cancelamento/encerramento, novo convite só
  após sete dias. Só o destinatário responde; só o remetente cancela o convite.
- Encerrar conexão cancela reuniões futuras propostas/confirmadas.
- Mensagem usa `clientId` para evitar duplicação quando o mesmo envio é repetido.
- Reuniões têm fuso e confirmação da contraparte. Reagendamento: cancelar e propor
  outra. Só o organizador conclui, após o horário final.
- A edição atual não troca papel, e-mail, senha ou todos os campos de preferências.
- O seed é repetível, não apaga dados e não sobrescreve edições/senhas existentes.

## API

Prefixo `/api`; autenticação `Authorization: Bearer <token>`. Listas aceitam `page`
e `limit` (máximo 100). Erros trazem `{error}`; validação também traz `{fields}`.

| Método/caminho | Uso |
|---|---|
| GET `/catalog` | Valores válidos e versão do aceite |
| POST `/auth/register` | Dados do formulário e papel, sem ADMIN |
| POST `/auth/login` | `email,senha,manterConectado`; retorna `access_token,user` |
| GET `/auth/me` | Conta e perfil próprios |
| POST `/auth/logout` | Revoga todas as sessões da conta |
| POST `/auth/forgot-password` | `metodo: E-mail,contato` |
| POST `/auth/reset-password` | `token,senha` |
| GET `/startups` | `q,category,favorites,page,limit` |
| GET `/investors` | Profissionais aprovados |
| GET `/recommendations` | Ranking personalizado |
| GET `/startups/:id`, `/investors/:id` | Detalhes |
| PATCH `/profile` | Campos editáveis do perfil próprio |
| PUT/DELETE `/favorites/:id` | Favoritar/remover |
| GET/POST `/connections` | Listar/criar; `startupId,investorId?,purpose,introduction` |
| PATCH `/connections/:id` | `action: accept,decline,cancel,close` |
| GET/POST `/connections/:id/messages` | Ler/enviar `text,clientId` |
| GET `/meetings` | Agenda |
| POST `/connections/:id/meetings` | `title,startsAt,duration,timezone,location` |
| PATCH `/meetings/:id` | `action: confirm,cancel,complete`; motivo no cancelamento |
| GET/PATCH `/notifications`, `/notifications/:id` | Listar/marcar lida |
| GET `/admin/profiles` | Perfis por status |
| PATCH `/admin/profiles/:kind/:id` | `kind: startup/investor`; `status,reason` |
| GET `/admin/metrics` | Contagens globais |
| GET `/admin/audit` | Decisões administrativas |

## Cronograma e lacunas

| Entrega | Situação em 20/10 |
|---|---|
| 14/09 — RF01/02 perfis | Cadastro persistido e edição básica; falta edição completa das preferências |
| 21/09 — RF07 autenticação | Login/JWT/hash/papéis/revogação; configurar SMTP |
| 28/09 — RF03 matchmaking | Regras implementadas, testadas e ligadas ao feed |
| 03/10 — RF04 perfis | Descoberta, ranking e detalhes antes do convite |
| 05/10 — RF05 comunicação | Mensagens/reuniões persistidas; atualização do chat é manual |
| 24/10 — RF06 Pitch/Canvas | Link HTTPS e nove blocos Canvas com visibilidade; upload de arquivos pendente |
| 26/10 — RF11 políticas | Aceite versionado e aviso de demonstração; revisão de governança/exclusão pendente |
| 07/11 — criptografia | TLS do banco e hash; HTTPS do deploy, proteção de campos em repouso e gestão de chaves pendentes |
| 09/11 — RF08/09 administração | Moderação e métricas básicas; suspensão/denúncias/filtros temporais/relatórios pendentes |
| 16/11 — RF10 feedback | Não implementado |
| 23/11 — beta/negócio/governança | Planos/cobrança simulada, retenção/exclusão e validação da equipe pendentes |
| 30/11–03/12 — apresentação | Completar pendências e ensaiar o roteiro |

As métricas contam pares com aceite em algum momento, conversas com mensagens e
reuniões atualmente confirmadas/concluídas (canceladas excluídas). Incluem o seed e
não constituem relatório por período.

## Verificações e estudo

Executados: build TypeScript e Vite; sete testes unitários; teste integrado com
Supabase para cadastro, moderação, recomendação, favorito, aceite, idempotência de
mensagem, privacidade da conversa, agenda/conflito e revogação. Contas temporárias
são removidas. Login e feed também foram verificados pelo navegador.

O driver pg emite aviso de depreciação sobre consultas internas concorrentes do
adapter; testes passaram com pg 8 fixado. Não atualizar para pg 9 sem validar o adapter.

Para entender o código, leia: `src/app.ts`, `src/lib/security.ts`,
`src/routes/auth.ts`, `prisma/schema.prisma`, `src/domain/matchmaking.ts`,
`src/routes/profiles.ts` e `src/routes/interactions.ts`.
No frontend, `src/lib/api.js` centraliza sessão/chamadas; `Feed.jsx` apresenta a
descoberta e `Workspace.jsx` reúne os fluxos funcionais, ainda divisíveis em componentes.

Antes de produção: HTTPS, revisão de token no navegador contra XSS, usuário do banco
com privilégio mínimo, retenção/exclusão, backups e operação. Não há alegação de
conformidade legal completa ou prontidão para produção nesta entrega acadêmica.
