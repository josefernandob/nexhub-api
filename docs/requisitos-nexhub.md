# Requisitos do Nexhub

Versão 0.1 — proposta para validação da equipe — 18/09/2026.

O Nexhub conecta startups a investidores anjo e mentores, com foco inicial no ecossistema do Nordeste e do Porto Digital. Este documento transforma os requisitos gerais do professor em comportamentos verificáveis, telas, ações e regras para orientar o trabalho de frontend, backend e testes.

Esta é uma primeira especificação completa para discussão, não uma declaração de que todas as decisões já foram aprovadas. Os requisitos originais do professor são obrigatórios na referência fornecida; os detalhes de funcionamento abaixo são propostas, salvo quando explicitamente atribuídos ao professor ou ao responsável pelo projeto.

## 1. Fontes e interpretação

- Documento do professor: `Requisitos_-_Projeto_Integrador_5o_Periodo_ADS (1).docx`.
- Cronograma: `Cronograma_de_Entregas_-_Full_Stack_5o_Periodo_ADS.docx`.
- Solicitação do líder: incluir IA que recomende startups conforme o perfil do investidor; concluir o levantamento antes de continuar o backend; explicar a implementação quando essa etapa começar.
- Decisão confirmada pelo líder nesta conversa: oferecer planos gratuitos e pagos, com cobrança apenas demonstrativa.
- Código observado: `src/controllers`, `src/routes`, `src/app.ts` e `prisma/schema.prisma`. A análise foi por leitura, sem executar a aplicação ou validar o banco.

O professor exige afinidade por segmento, estágio e interesse, mas não exige uma técnica específica de IA. SaaS não significa, por si só, que pagamentos precisam ser implementados. O material pede também plano de negócios e governança; esses entregáveis não se resumem ao software.

## 2. Escopo proposto

**Versão acadêmica:** cadastro, autenticação, perfis, descoberta, recomendações, solicitação de conexão, mensagens, reuniões, Pitch e Canvas, moderação, indicadores, avaliações, controles de privacidade e planos gratuitos/pagos com contratação simulada. A IA faz parte da intenção informada para o Nexhub e precisa de uma definição de aceite própria.

**Evolução, sem obrigação identificada no material:** cobrança real e integração com pagamentos, repasse de dinheiro, contratos de investimento, carteira financeira, verificação documental automática, videoconferência própria, integração com calendários, aplicativo nativo, rede social/feed e CRM de investimentos.

Decisão do líder: plano gratuito e plano pago demonstrativo, sem movimentação de valores. Preços, benefícios, limites e público pagante ainda são propostas a validar. Investimento financeiro ocorre fora do Nexhub; o sistema facilita descoberta e contato.

## 3. Perfis e responsabilidades

| Perfil | Pode fazer | Limite principal |
|---|---|---|
| Visitante | Conhecer o produto, consultar políticas, cadastrar-se e entrar | Não consulta informações privadas |
| Empreendedor | Administrar sua startup, buscar parceiros e conduzir suas interações | Não altera startups de terceiros |
| Investidor | Definir interesses e faixa de investimento, descobrir startups e interagir | Não modifica dados das startups |
| Mentor | Informar especialidades e disponibilidade, descobrir startups e interagir | Não precisa informar ticket financeiro |
| Investidor e mentor | Usar as duas modalidades de atuação | O contexto da conexão deve ser identificado |
| Administrador | Moderar contas e conteúdo, consultar indicadores e auditoria | Não recebe acesso irrestrito a conversas ou materiais privados por padrão |

Conta é a pessoa que entra no sistema; startup é a organização administrada por essa pessoa. Proposta inicial: um responsável e uma startup por conta de empreendedor. Suporte a equipes, múltiplos responsáveis e múltiplas startups é evolução. Investidor pode acumular o papel de mentor; combinação empreendedor/investidor depende de decisão da equipe. Administrador não é uma opção de cadastro público.

## 4. Catálogo funcional

Os códigos `RF01` a `RF11` preservam a referência do professor. Sufixos identificam detalhamentos propostos. `RF12` em diante identifica funcionalidades adicionais propostas. “Entrega” significa necessário para concretizar o requisito original no desenho sugerido; não significa texto literal do professor. “Complemento” pode ser negociado sem excluir o requisito original.

### RF01 Cadastro e manutenção de startups

Origem: professor. Detalhamento proposto para a entrega.

| ID | Comportamento verificável |
|---|---|
| RF01.01 | O empreendedor cria o perfil da startup associado à sua conta autenticada. O responsável vem da sessão, não de uma escolha livre do formulário. |
| RF01.02 | O cadastro registra nome, descrição, segmento principal, estágio, cidade/UF e necessidades. Segmento, estágio e necessidades usam opções padronizadas. |
| RF01.03 | CNPJ, site e logotipo são opcionais. CNPJ informado deve ter formato/dígitos válidos e não pode repetir outra startup; isso não representa verificação oficial da empresa. |
| RF01.04 | Necessidades aceitam múltipla escolha: investimento, mentoria de negócios, técnica, comercial e outras categorias aprovadas pela equipe. |
| RF01.05 | Se procura investimento, informa valor pretendido positivo em BRL. Se procura mentoria, seleciona áreas desejadas. |
| RF01.06 | O responsável salva rascunho incompleto, edita e visualiza seu perfil. Publicação exige campos obrigatórios completos. |
| RF01.07 | “Enviar para análise” coloca o cadastro em revisão; aprovação administrativa o torna visível na descoberta. Rejeição apresenta motivo e permite corrigir e reenviar. |
| RF01.08 | “Pausar perfil” retira a startup de novas descobertas e recomendações. “Reativar” restaura a visibilidade apenas se aprovada e com conta ativa. |

Critério de aceite: uma startup incompleta pode permanecer em rascunho, mas não ser publicada. Outra conta não consegue editá-la, inclusive por acesso direto à API.

### RF02 Cadastro e manutenção de investidores e mentores

Origem: professor. Detalhamento proposto para a entrega.

| ID | Comportamento verificável |
|---|---|
| RF02.01 | O usuário escolhe investidor, mentor ou ambos e informa nome, biografia, cidade/UF e interesses. O e-mail pertence à conta. |
| RF02.02 | Investidor informa segmentos, estágios de interesse, faixa de aporte mínimo/máximo em BRL e atuação geográfica. |
| RF02.03 | Mentor informa especialidades, experiência resumida, horas disponíveis por mês e formato de atendimento remoto/presencial/ambos. |
| RF02.04 | O perfil “ambos” preenche os dois conjuntos. Alterar a modalidade solicita os campos que faltam antes da publicação. |
| RF02.05 | O usuário salva, edita, envia à análise, pausa e reativa seu perfil seguindo regras equivalentes às de startup. |
| RF02.06 | Preferências estruturadas alimentam as recomendações; campos vazios não são interpretados como qualquer interesse. |

Critério de aceite: mentor não é obrigado a declarar aporte. Investidor não publica faixa negativa ou mínimo maior que máximo. A necessidade de manter também um “ticket médio” separado deve ser validada com o professor, pois o documento usa esse termo.

### RF03 Matchmaking e recomendação com IA

Origem: afinidade exigida pelo professor; IA solicitada pelo líder. Detalhamento proposto.

| ID | Comportamento verificável |
|---|---|
| RF03.01 | Investidores recebem startups compatíveis com seus interesses; mentores recebem startups que precisam de suas especialidades. |
| RF03.02 | Startups recebem investidores e mentores compatíveis com segmento, estágio e necessidades. |
| RF03.03 | Apenas perfis completos, publicados, aprovados e ativos são elegíveis. Bloqueios entre participantes excluem o par das sugestões. |
| RF03.04 | A afinidade considera segmento, estágio, necessidade e critérios específicos: faixa de aporte para investimento e especialidade/disponibilidade para mentoria. |
| RF03.05 | Cada cartão mostra os principais motivos da recomendação e, se adotado, índice de compatibilidade de 0 a 100. Esse índice representa afinidade, não chance de retorno financeiro. |
| RF03.06 | A alteração de campos relevantes atualiza as sugestões na próxima consulta ou em processamento sinalizado na tela. |
| RF03.07 | “Não tenho interesse” oculta a sugestão para o usuário atual. Ele pode consultar e restaurar sugestões ocultadas. |
| RF03.08 | Perfil sem dados suficientes apresenta os campos que faltam. Ausência de resultados apresenta estado vazio e opção de explorar com outros filtros. |
| RF03.09 | Para cumprir a intenção de IA, um componente de IA usa descrições de startups e preferências do investidor para identificar compatibilidade semântica e influenciar a ordenação. Apenas redigir a explicação de uma pontuação fixa não será considerado suficiente para esse aceite proposto. |
| RF03.10 | O sistema conserva a versão do mecanismo, data e critérios usados para permitir explicar o resultado e comparar versões. |
| RF03.11 | Falha ou limite do serviço de IA aciona classificação básica por regras e sinaliza a indisponibilidade da análise inteligente. A descoberta continua funcionando. |
| RF03.12 | A IA utiliza somente informações autorizadas para recomendação. Conversas privadas, documentos restritos e dados de outras contas não entram automaticamente no processamento. |

Aceite da afinidade: com perfis de teste previamente definidos, mudar segmento/estágio/interesse deve alterar o resultado de maneira explicável; perfil suspenso nunca é recomendado.

Aceite proposto da IA: montar uma pequena base revisada pela equipe, incluindo descrições equivalentes com palavras diferentes e pares claramente incompatíveis; verificar a influência semântica na ordenação e a fidelidade das justificativas. Meta de qualidade, custo e tempo de resposta ainda precisam ser acordados. Pontos e pesos não devem ser inventados na implementação sem registro.

Vocabulário: recomendação é uma sugestão do sistema; solicitação é um convite para conversar; match é uma conexão aceita. Essa definição evita contar cada visualização de uma recomendação como um novo match.

### RF04 Descoberta e visualização de perfis

Origem: professor. Detalhamento proposto para a entrega.

| ID | Comportamento verificável |
|---|---|
| RF04.01 | Usuário autenticado consulta catálogo paginado de perfis publicados, com busca por nome e filtros de segmento, estágio, localização e modalidade aplicável. |
| RF04.02 | Pode ordenar por compatibilidade quando houver perfil suficiente ou por cadastro mais recente. Limpar filtros restaura a busca padrão. |
| RF04.03 | O cartão mostra nome, resumo, segmento/especialidade, localização, estágio quando aplicável e motivo de afinidade quando disponível. |
| RF04.04 | “Ver perfil” abre informações completas autorizadas antes de qualquer contato. E-mail e contatos pessoais ficam privados por padrão. |
| RF04.05 | O perfil da startup mostra apresentação, necessidades, Pitch e Canvas conforme a visibilidade definida. O de investidor/mentor mostra atuação e preferências. |
| RF04.06 | “Conectar” permite iniciar o fluxo de convite. O botão mostra estados diferentes para solicitação pendente, conexão aceita ou interação indisponível. |

Critério de aceite: resultados respeitam filtros combinados e não revelam perfis em rascunho, suspensos ou bloqueados. Acesso direto a perfil indisponível também é recusado.

### RF05 Comunicação e agendamento

Origem: professor. Aceitar conexão antes da conversa é uma regra proposta, não imposição do material.

| ID | Comportamento verificável |
|---|---|
| RF05.01 | Startup ou investidor/mentor envia solicitação com finalidade de investimento, mentoria ou ambas e mensagem inicial de até 500 caracteres. |
| RF05.02 | O destinatário aceita ou recusa; o remetente cancela enquanto pendente. Não pode haver duas solicitações pendentes ou conexões ativas para o mesmo par startup–pessoa. |
| RF05.03 | Aceitar cria uma conexão e disponibiliza uma conversa. Recusar ou cancelar não libera mensagens. Proposta: nova tentativa após recusa somente depois de 7 dias. |
| RF05.04 | Participantes de conexão ativa enviam texto de 1 a 2.000 caracteres, consultam histórico paginado e veem autor, data/hora e falha de envio. Texto só com espaços é inválido. |
| RF05.05 | Repetir um envio após falha não deve duplicar mensagem já registrada. Conteúdo digitado é preservado durante a tentativa. |
| RF05.06 | A lista de conversas mostra última mensagem e quantidade não lida. Abrir a conversa marca as mensagens exibidas como lidas para aquele participante. |
| RF05.07 | Um participante propõe reunião com assunto, data, horário, duração, fuso e local ou link externo HTTPS. Não há sala de vídeo própria no escopo inicial. |
| RF05.08 | O destinatário confirma, recusa ou propõe outro horário. Uma alteração de horário exige nova confirmação da outra parte. |
| RF05.09 | Ambos consultam reuniões propostas, confirmadas, canceladas e concluídas; podem cancelar informando motivo. Horários passados não são aceitos para nova reunião. |
| RF05.10 | O sistema impede conflito entre reuniões confirmadas dos participantes. Horários são armazenados com referência consistente e exibidos no fuso informado. |
| RF05.11 | Depois do horário final de reunião confirmada, participante pode registrar conclusão ou ausência. A conclusão libera avaliação; divergência pode ser denunciada. |
| RF05.12 | Encerrar conexão impede novas mensagens e propostas. Histórico autorizado permanece consultável conforme a política de retenção aprovada. |

Critério de aceite: terceiro não lê mensagens nem altera reunião alheia. Dois aceites simultâneos não criam duas conversas. Uma confirmação não gera conflito de agenda. Para a primeira versão, atualização periódica de mensagens pode atender o fluxo; tempo real precisa ser combinado com o frontend.

### RF06 Pitch e modelo de negócios Canvas

Origem: professor. Detalhamento proposto para a entrega.

| ID | Comportamento verificável |
|---|---|
| RF06.01 | Responsável cadastra resumo do pitch, link HTTPS de vídeo/apresentação e, como proposta de formato, um PDF de até 10 MB. |
| RF06.02 | Preenche Canvas em nove blocos: segmentos de clientes, proposta de valor, canais, relacionamento, fontes de receita, recursos principais, atividades principais, parcerias principais e estrutura de custos. |
| RF06.03 | Salva materiais em rascunho, pré-visualiza e envia a versão para publicação. Alteração sujeita à moderação não substitui a versão aprovada antes de aprovação. |
| RF06.04 | Define visibilidade do Pitch e do Canvas separadamente: usuários autenticados ou apenas conexões aceitas. Padrão proposto: apenas conexões. |
| RF06.05 | “Ver pitch” e “Ver Canvas” verificam permissão também no servidor. Link direto de arquivo não deve permitir acesso permanente sem autorização. |
| RF06.06 | Material restrito apresenta mensagem de acesso limitado e possibilidade de solicitar conexão, sem expor seu conteúdo. |

Critério de aceite: usuário sem conexão não abre material restrito mesmo copiando a URL de outra sessão. O perfil básico permanece suficiente para avaliar interesse antes do contato. Exigência de Pitch/Canvas completos para publicar a startup deve ser confirmada; proposta inicial: não bloquear o primeiro cadastro.

### RF07 Autenticação e autorização

Origem: professor. Detalhamento proposto para a entrega.

| ID | Comportamento verificável |
|---|---|
| RF07.01 | Cadastro cria conta com nome, e-mail único, senha e perfil permitido; e-mail é normalizado e senha deve ter entre 12 e 128 caracteres. |
| RF07.02 | Login autentica por e-mail/senha; falha usa mensagem genérica, sem distinguir conta inexistente de senha errada. |
| RF07.03 | Sessão identifica a conta e os papéis autorizados. Logout invalida a sessão atual; sessão expirada solicita novo login. |
| RF07.04 | Toda ação protegida valida autenticação, papel, estado da conta e propriedade do recurso no backend. Ocultar botão não substitui autorização. |
| RF07.05 | Administradores são provisionados por processo restrito; cadastro público ou edição de perfil não pode promover usuário a administrador. |
| RF07.06 | Conta suspensa não inicia sessão utilizável nem continua operações com sessão antiga. |
| RF07.07 | Recuperação de senha usa link temporário de uso único, com validade proposta de 30 minutos, resposta genérica e invalidação de sessões após redefinição. Complemento recomendado. |
| RF07.08 | Confirmação de e-mail usa link temporário com reenvio limitado; contato com outros usuários exige e-mail confirmado. Complemento recomendado, dependente de envio de e-mail. |

Critério de aceite: empreendedor não acessa moderação; investidor não altera startup; alterar um identificador na requisição não amplia permissões. A conta de demonstração do administrador não deve ser criada por endpoint público.

### RF08 Moderação administrativa

Origem: professor. Detalhamento proposto para a entrega.

| ID | Comportamento verificável |
|---|---|
| RF08.01 | Administrador consulta fila de perfis e materiais pendentes, com filtros por tipo e estado. |
| RF08.02 | Abre o conteúdo submetido e aprova ou rejeita. Rejeição exige justificativa visível ao responsável. |
| RF08.03 | Suspende e reativa contas com motivo; remove conteúdo de exibição sem apagar o registro da decisão. |
| RF08.04 | Usuário denuncia perfil, material, avaliação ou mensagem, escolhendo motivo e descrição. Denunciar não suspende automaticamente o denunciado. |
| RF08.05 | Administrador classifica a denúncia como aberta, em análise ou concluída, registra decisão e acesso apenas à evidência necessária. |
| RF08.06 | Cada ação administrativa registra autor, data, recurso, ação e motivo em auditoria não editável pela interface. |

Critério de aceite: reprovação não equivale a excluir conta. Perfil suspenso desaparece da descoberta. O administrador não obtém acesso livre a todos os chats; o desenho do acesso à evidência deve ser validado em governança.

### RF09 Métricas de uso

Origem: professor. Detalhamento proposto para a entrega.

| ID | Comportamento verificável |
|---|---|
| RF09.01 | Administrador consulta número de matches, conversas iniciadas e reuniões agendadas por período. |
| RF09.02 | Match conta a primeira aceitação de uma conexão; sugestão exibida e convite enviado não contam como match. |
| RF09.03 | Conversa iniciada conta a primeira mensagem enviada em uma conversa, não a simples criação do canal. |
| RF09.04 | Reunião agendada conta a primeira confirmação de uma reunião. Reagendamento do mesmo registro não cria outra contagem; cancelamentos aparecem separadamente. |
| RF09.05 | Painel informa intervalo, fuso e data de atualização; considera a data do evento correspondente para cada indicador. |
| RF09.06 | Como complemento, apresenta startups publicadas, investidores/mentores ativos e solicitações pendentes. |

Critério de aceite: repetir uma confirmação não altera a contagem. Histórico de eventos preserva indicadores mesmo quando um perfil deixa de estar visível, respeitando anonimização e retenção definidas pela equipe.

### RF10 Feedback e avaliação após interação

Origem: professor. Reunião concluída como gatilho é uma proposta para tornar “pós-interação” verificável.

| ID | Comportamento verificável |
|---|---|
| RF10.01 | Após reunião concluída, cada participante avalia o outro uma vez por reunião, com nota inteira de 1 a 5 e comentário opcional de até 1.000 caracteres. |
| RF10.02 | Avaliação registra autor, destinatário, reunião e data. Autorrevisão e avaliação por terceiros são proibidas. |
| RF10.03 | O destinatário consulta feedback recebido; proposta inicial mantém comentário entre participantes e moderação autorizada, sem ranking público. |
| RF10.04 | Usuário denuncia avaliação abusiva; administrador pode ocultá-la com motivo e auditoria. |

Critério de aceite: não é possível avaliar reunião apenas proposta, cancelada ou marcada como ausência. Duas requisições idênticas não criam avaliações duplicadas. A equipe deve validar se conversa encerrada também poderá habilitar avaliação.

### RF11 Políticas e consentimentos

Origem: professor, com dependência de RNF03. Este documento descreve comportamento do produto; não substitui validação jurídica ou as políticas da disciplina de Governança.

| ID | Comportamento verificável |
|---|---|
| RF11.01 | Cadastro apresenta links para política de privacidade e termos de uso antes da conclusão. |
| RF11.02 | Sistema registra aceite dos termos com usuário, versão e data/hora. Caixas não vêm previamente selecionadas. |
| RF11.03 | Consentimentos opcionais são separados por finalidade e não condicionam o uso básico quando não forem necessários. Aceite de termos não é tratado como autorização genérica para qualquer uso de dados. |
| RF11.04 | Configurações permitem consultar políticas vigentes e histórico de aceite, além de revogar consentimentos opcionais. |
| RF11.05 | Usuário solicita correção ou exclusão de dados e acompanha estado do pedido. Exclusão exige confirmação e nova autenticação. |
| RF11.06 | Processo de exclusão define o tratamento de perfil, arquivos, mensagens compartilhadas e auditoria; não promete apagar imediatamente todos os registros sem uma política de retenção aprovada. |

Critério de aceite: o registro de aceite corresponde à versão exibida. Revogação de finalidade opcional interrompe aquele uso. Finalidades, bases de tratamento, prazos e texto das políticas devem ser fechados com Governança.

### RF12 Notificações internas

Origem: complemento proposto para viabilizar os fluxos sem depender de e-mail em todos os eventos.

- RF12.01: notificar recebimento/aceite/recusa de convite, nova mensagem, proposta/alteração/cancelamento de reunião e decisão de moderação.
- RF12.02: exibir contador de não lidas, marcar individualmente ou todas como lidas e abrir o recurso relacionado.
- RF12.03: revalidar acesso ao abrir notificação; se o recurso foi removido ou a permissão revogada, informar indisponibilidade.
- Aceite: notificação pertence apenas ao destinatário e não expõe o texto de uma mensagem privada a outra conta.

### RF13 Favoritos

Origem: complemento opcional.

- RF13.01: salvar/remover perfil de uma lista pessoal, sem avisar o outro usuário e sem criar match.
- RF13.02: listar favoritos paginados e indicar indisponibilidade de perfil que deixou de ser elegível, sem revelar conteúdo restrito.

### RF14 Bloqueio e encerramento de contato

Origem: complemento recomendado, associado à comunicação e moderação.

- RF14.01: bloquear outro participante, impedindo novas solicitações, mensagens e recomendações entre o par.
- RF14.02: confirmar o bloqueio e informar seu efeito nas reuniões futuras; proposta: cancelar reuniões pendentes/futuras entre o par e notificar cancelamento sem revelar o motivo do bloqueio.
- RF14.03: permitir desbloquear, sem restaurar automaticamente conexão ou reuniões anteriores.
- Aceite: sessão antiga não consegue enviar mensagem depois do bloqueio; histórico não é apagado automaticamente.

### RF15 Planos e assinatura demonstrativa

Origem: planos gratuitos e pagos com cobrança demonstrativa confirmados pelo líder. Benefícios, limites, preço e funcionamento abaixo são propostas para validação.

| ID | Comportamento verificável |
|---|---|
| RF15.01 | Exibir plano Gratuito e plano Pro com descrição, benefícios, limites e indicação explícita de demonstração. Preço comercial depende do plano de negócios e deve ser identificado como ilustrativo enquanto não validado. |
| RF15.02 | Nova conta elegível inicia no Gratuito. Proposta: assinatura vinculada à conta; administrador não contrata plano. |
| RF15.03 | “Simular contratação” abre resumo com plano, benefícios e aviso de que nenhum valor será cobrado. Não solicita cartão, Pix, CPF de cobrança ou dados bancários reais. |
| RF15.04 | Na demonstração, permitir testar aprovação e recusa do pagamento simulado. Apenas aprovação ativa o Pro; recusa mantém o plano anterior e permite nova tentativa. |
| RF15.05 | Registrar identificador da operação, conta, plano, data, resultado e marcação de simulação. Repetir a confirmação não cria duas assinaturas ou duas alterações. |
| RF15.06 | Mostrar plano atual, benefícios ativos e histórico de mudanças. Nenhum recibo deve parecer comprovante de pagamento real. |
| RF15.07 | Proposta inicial: Gratuito permite todos os fluxos acadêmicos essenciais, inclusive recomendação por afinidade e contato; Pro libera a ordenação semântica por IA e suas justificativas ampliadas. Não cobrar por privacidade, acesso ao histórico ou direitos sobre dados. |
| RF15.08 | Ao acessar benefício Pro no Gratuito, apresentar explicação e botão “Ver planos”. O backend também verifica o plano; esconder o recurso na tela não basta. |
| RF15.09 | “Voltar ao Gratuito” pede confirmação, aplica mudança imediatamente nesta simulação e preserva perfil, conexões, mensagens, reuniões e materiais existentes. Novas consultas usam os recursos do plano Gratuito. |
| RF15.10 | Informar que não existe renovação nem débito automático nesta versão demonstrativa. Se a equipe quiser simular vencimento mensal, será necessário definir duração, renovação e estados adicionais antes da implementação. |

Critério de aceite: conta gratuita não obtém recurso Pro alterando a requisição; contratação simulada aprovada libera o benefício; simulação recusada não altera assinatura; retorno ao Gratuito não apaga dados. O diferencial de IA no Pro deve ser validado comercialmente e a apresentação acadêmica deve incluir uma conta Pro de demonstração.

Esta proposta evita limites numéricos arbitrários de mensagens ou conexões antes da validação comercial. Caso sejam adotadas cotas, especificar quantidade, período, fuso de reinício, consumo, devolução e comportamento após downgrade.

## 5. Mapa de telas e ações

As telas representam responsabilidades de interface. A equipe pode combinar páginas ou usar abas sem mudar os comportamentos. Campos completos estão no catálogo e no dicionário abaixo.

| Tela | Quem acessa | Conteúdo e ações | Resultado e estados essenciais |
|---|---|---|---|
| T01 Apresentação | Todos | Explicação do Nexhub, “Criar conta”, “Entrar”, links de políticas | Encaminha ao cadastro/login; não mostra informações privadas |
| T02 Cadastro | Visitante | Nome, e-mail, senha, confirmação, modalidade, termos; “Criar conta”, “Já tenho conta” | Valida campos, cria conta e abre preenchimento de perfil; mostra erros por campo e evita envio duplicado |
| T03 Login e recuperação | Visitante | E-mail/senha; “Entrar”, “Mostrar senha”, “Esqueci minha senha” | Login abre painel ou conclusão do perfil; recuperação confirma pedido sem revelar existência da conta |
| T04 Minha startup | Empreendedor | Dados básicos, necessidades, prévia, estado de análise; “Salvar rascunho”, “Enviar para análise”, “Pausar perfil” | Mostra campos pendentes e motivo de rejeição; “Reativar” aparece quando pausada |
| T05 Meu perfil profissional | Investidor/mentor | Modalidade, interesses, faixa de aporte, especialidades, disponibilidade; “Salvar”, “Pré-visualizar”, “Enviar para análise”, “Pausar” | Campos condicionais à modalidade; informa efeito das alterações nas sugestões |
| T06 Painel inicial | Autenticados | Pendências do perfil, recomendações resumidas, convites e próximas reuniões; “Completar perfil”, “Ver recomendações”, “Abrir reunião” | Cards levam à função correspondente; sem dados, orienta primeiro passo |
| T07 Explorar | Autenticados | Busca, filtros, ordenação, paginação; “Aplicar filtros”, “Limpar”, “Ver perfil”, “Favoritar” se adotado | Carregamento, erro com nova tentativa e ausência de resultados; mantém filtros ao voltar do perfil |
| T08 Recomendações | Autenticados | Cards ordenados, razões de afinidade, aviso de dados incompletos/IA indisponível; “Ver perfil”, “Conectar”, “Não tenho interesse”, “Ver ocultados” | Ocultar não denuncia nem bloqueia; lista ocultada permite “Restaurar” |
| T09 Perfil de startup | Autenticados autorizados | Apresentação, segmento, estágio, necessidades, Pitch/Canvas; “Conectar”, “Ver pitch”, “Ver Canvas”, “Denunciar” | Proprietário vê “Editar”; material restrito explica condição de acesso; convite pendente muda o botão |
| T10 Perfil de investidor/mentor | Autenticados autorizados | Biografia, interesses, faixa/especialidades, disponibilidade; “Conectar”, “Denunciar”, “Favoritar” se adotado | Esconde dados privados; não promete disponibilidade de agenda com base apenas em horas/mês |
| T11 Solicitações | Autenticados | Abas recebidas/enviadas, finalidade, mensagem e estado; “Aceitar”, “Recusar”, “Cancelar”, “Ver perfil” | Aceite abre conversa; ações deixam de funcionar após mudança de estado por outra sessão |
| T12 Conversas | Participantes | Lista, contador, histórico, campo de texto; “Enviar”, “Tentar novamente”, “Agendar reunião”, “Encerrar conexão”, “Bloquear”, “Denunciar mensagem” | Envio vazio desabilitado; falha preserva texto; conexão encerrada mostra histórico sem novo envio |
| T13 Reuniões | Participantes | Lista/calendário e formulário; “Propor reunião”, “Confirmar”, “Recusar”, “Propor novo horário”, “Cancelar”, “Abrir link”, “Marcar concluída”, “Registrar ausência” | Botões dependem de estado e horário; conflito explica necessidade de outra opção |
| T14 Pitch e Canvas | Responsável da startup | Editor dos nove blocos, upload/link, visibilidade; “Salvar rascunho”, “Pré-visualizar”, “Enviar para análise”, “Substituir arquivo”, “Remover” | Upload mostra progresso/erro; remoção confirma efeito; rejeição conserva versão aprovada |
| T15 Avaliações | Participantes elegíveis | Reunião, destinatário, estrelas, comentário; “Enviar avaliação”, “Ver recebidas”, “Denunciar” | Enviar exige nota; avaliação já enviada não duplica; não elegível recebe explicação |
| T16 Notificações | Autenticados | Eventos com data e estado; “Abrir”, “Marcar como lida”, “Marcar todas como lidas” | Atualiza contador sem alterar notificações de outros usuários |
| T17 Configurações | Titular | Conta, preferências opcionais, políticas, pedidos de dados; “Salvar”, “Alterar senha”, “Solicitar exclusão”, “Sair” | Ações sensíveis exigem confirmação; pedidos mostram protocolo/estado |
| T18 Moderação | Administrador | Fila, filtros, detalhe e denúncias; “Aprovar”, “Rejeitar”, “Suspender”, “Reativar”, “Ocultar conteúdo”, “Concluir denúncia” | Motivo obrigatório quando cabível; decisão audita e notifica responsável |
| T19 Indicadores | Administrador | Matches, conversas, reuniões; período e fuso; “Aplicar período”, “Limpar filtros” | Explica cada indicador; sem eventos mostra zero, falha não é apresentada como zero |
| T20 Auditoria | Administrador autorizado | Autor, ação, recurso, motivo e data; filtros e “Ver detalhe” | Somente leitura, paginação; não registra senhas, tokens ou conteúdo privado desnecessário |
| T21 Planos | Visitantes e contas elegíveis | Comparação Gratuito/Pro, aviso de simulação; “Usar Gratuito”, “Simular contratação” | Visitante é levado ao cadastro; usuário autenticado segue para resumo; plano atual é identificado |
| T22 Contratação demonstrativa | Conta autenticada elegível | Resumo e aviso de ausência de cobrança; “Simular aprovação”, “Simular recusa”, “Voltar” | Aprovação ativa Pro uma vez; recusa mantém plano; não coleta meios de pagamento reais |
| T23 Minha assinatura | Titular | Plano atual, recursos e histórico; “Ver planos”, “Voltar ao Gratuito” | Confirma downgrade, informa perda de benefícios futuros e preserva registros existentes |

## 6. Campos e validações compartilhadas

Valores abaixo são propostas iniciais para manter frontend e backend consistentes. As validações devem existir no servidor e ser refletidas na interface.

| Campo | Regra proposta |
|---|---|
| Nome de pessoa/startup | 2 a 120 caracteres após remover espaços das pontas |
| Descrição de startup | 50 a 2.000 caracteres para publicação; rascunho pode ser incompleto |
| Biografia profissional | 50 a 2.000 caracteres para publicação |
| E-mail | Formato válido, normalização, unicidade na conta; não expor publicamente por padrão |
| Senha | 12 a 128 caracteres; confirmação somente no formulário; nunca armazenar senha legível |
| Segmentos | Catálogo compartilhado; por exemplo FinTech, EdTech, HealthTech, SaaS e Economia Criativa; lista final a validar |
| Estágio | Ideação, MVP, Tração ou Escala; explicação curta na interface |
| Localização | Cidade e UF para foco brasileiro; preferência pode permitir remoto ou qualquer localidade |
| Valores financeiros | BRL, até duas casas decimais, positivos quando informados; mínimo menor ou igual ao máximo; limite superior a validar |
| Disponibilidade de mentoria | Inteiro de 1 a 160 horas/mês quando modalidade inclui mentor; não representa horários reserváveis |
| Site e links | HTTPS válido, até 2.048 caracteres; não executar HTML enviado pelo usuário |
| Logotipo | PNG/JPEG/WebP de até 2 MB; verificar conteúdo, não só extensão |
| Pitch PDF | Até 10 MB; acesso protegido conforme visibilidade; falha de upload não remove versão atual |
| Canvas | Nove textos, até 3.000 caracteres por bloco; completude exigida ao publicar o Canvas |
| Reunião | Assunto de 3 a 120 caracteres; duração de 15, 30, 45, 60 ou 90 minutos; início futuro e fuso explícito |
| Justificativa administrativa | 10 a 1.000 caracteres; sem dados pessoais desnecessários |

Campos obrigatórios de publicação podem ser opcionais no rascunho. Catálogos não devem ser textos livres diferentes em cada tela, pois isso prejudica filtros e matchmaking.

## 7. Regras de estado e de acesso

1. Perfil: rascunho → em análise → aprovado ou rejeitado. Perfil rejeitado pode voltar à análise. Visibilidade ativa/pausada e suspensão da conta são controles distintos; perfil aprovado não supera conta suspensa.
2. Alteração de conteúdo público aprovado: proposta de guardar versão publicada e versão em revisão, evitando sumir com o perfil a cada edição. Alterações de preferência privada de matchmaking podem entrar em vigor imediatamente.
3. Solicitação: pendente → aceita, recusada ou cancelada. Apenas destinatário aceita/recusa; apenas remetente cancela. Operações concorrentes devem respeitar o estado final já registrado.
4. Conexão: ativa → encerrada. Bloqueio restringe o par independentemente da existência de conexão. Reabertura exige novo fluxo autorizado, nunca restauração silenciosa.
5. Reunião: proposta → confirmada, recusada ou cancelada; confirmada → cancelada, concluída ou ausência. Reagendamento produz proposta revisada e mantém histórico; a agenda antiga só é liberada conforme a regra acordada de substituição. Proposta recomendada: manter a reserva confirmada até aceite do novo horário.
6. Avaliação: uma por autor e reunião concluída; apenas participantes. Conteúdo oculto pela moderação permanece identificável para auditoria autorizada.
7. Administrador analisa perfis e denúncias; acesso a materiais privados deve ser limitado à finalidade e ao conteúdo submetido à moderação.
8. Empreendedores não acessam dados privados de outras startups. Investidores/mentores não acessam preferências privadas de outros profissionais. A permissão de visualizar apresentação não equivale à permissão de editar, baixar material restrito ou enviar mensagem.
9. Listagens usam paginação proposta de 20 itens, limite de 100 por consulta. Ordenações devem ser estáveis para evitar repetição entre páginas.
10. Bloqueios, suspensão e mudanças de permissão valem na próxima operação, inclusive para uma tela aberta anteriormente.
11. Plano e papel são independentes: Pro não concede acesso de administrador nem permite editar dados de terceiros. Assinatura demonstrativa não comprova pagamento real. O plano muda apenas por operação autorizada, nunca por campo livre no cadastro.

## 8. Requisitos não funcionais e dependências

Os dez RNFs abaixo vêm do professor. Critérios mensuráveis são propostas a validar; o documento original não informa metas numéricas.

| Referência | Obrigação original resumida | Como transformar em aceite |
|---|---|---|
| RNF01 | Disponibilidade contínua e uso simultâneo | Definir hospedagem, monitoramento, recuperação e meta de disponibilidade; validar acessos concorrentes sem perda de dados |
| RNF02 | Criptografia em trânsito e em repouso | HTTPS em ambiente publicado e evidência de criptografia do banco, arquivos e backups; senha com hash apropriado, não criptografia reversível |
| RNF03 | Privacidade, finalidade e exclusão | Validar políticas e processo de solicitações com Governança; testar restrição de acesso e execução do fluxo aprovado |
| RNF04 | Interface intuitiva | Testar tarefas de cadastro, descoberta e contato com usuários não técnicos; registrar erros e melhorias |
| RNF05 | Crescimento sem redesenho | Paginação, dados persistentes, consultas medidas e separação de responsabilidades; proposta inicial de ensaio com 50 usuários simultâneos |
| RNF06 | Padrões e políticas de Governança | Receber padrões da disciplina e registrar como arquitetura e operação os atendem |
| RNF07 | Testes críticos e beta testers | Cobrir autenticação, autorização, conexão, mensagens, reuniões e privacidade; executar roteiro com usuários reais antes do lançamento |
| RNF08 | Desktop e mobile | Validar fluxos em larguras de 360, 768 e 1.440 px, sem rolagem horizontal indevida e com teclado utilizável |
| RNF09 | Modularidade, documentação e desacoplamento | Frontend usa contrato documentado de API; módulos separados; instruções reproduzíveis de ambiente e execução |
| RNF10 | Auditoria administrativa | Toda decisão administrativa possui autor, data, alvo e motivo, consultável sem possibilidade de edição pela interface |

Propostas complementares: listas comuns em até 2 segundos no percentil 95 sob a carga de ensaio acordada, com IA medida separadamente; limites de tentativas em login/recuperação; backup com restauração demonstrada; foco visível, rótulos e mensagens acessíveis. Essas metas ainda não são compromissos aprovados.

As datas de apresentação de segurança não justificam implementar autenticação ou armazenamento inicialmente inseguros. Senhas protegidas, autorização e separação de dados precisam acompanhar as primeiras funcionalidades.

## 9. Situação observada no backend

| Item | Evidência encontrada | Interpretação |
|---|---|---|
| Criar/listar startups | `StartupController` e rotas POST/GET `/api/startups` | Base inicial de RF01; não contempla edição, proprietário, moderação ou persistência |
| Criar/listar investidores/mentores | `InvestorController` e rotas POST/GET `/api/investors` | Base inicial de RF02; papel/interesses ainda são campos sem validação de catálogo |
| Armazenamento atual | Arrays estáticos nos controllers | Dados se perdem ao reiniciar o processo e não são compartilhados entre instâncias |
| Modelagem Prisma | Modelos `Startup` e `Investor`, datasource PostgreSQL | Intenção de banco já existe, mas controllers lidos não usam Prisma |
| Autenticação | Não encontrada nos arquivos de aplicação examinados | Conta, credenciais, sessão e permissões precisam ser modeladas para RF07 |
| Testes | Script `test` informa que não há teste especificado | Não foi identificada suíte automatizada; esta etapa não executou nem certificou o sistema |

Pontos para a futura modelagem, ainda sem decisão de implementação: separar conta de perfil; associar responsável à startup; substituir papéis e interesses livres por valores consistentes; distinguir investimento de mentoria; representar valores financeiros com precisão decimal; criar estados e registros de conexão, conversa, reunião, avaliação, material, consentimento, moderação, plano e assinatura demonstrativa.

Os comentários RF01/RF02 no schema indicam intenção, não comprovação de atendimento completo. A análise não altera a entrega já realizada nem afirma que o banco configurado está funcionando.

## 10. Cronograma do professor e preparação sugerida

As datas abaixo são transcritas do cronograma. A preparação é proposta do Nexhub.

| Data | Entrega prevista | Preparação sugerida |
|---|---|---|
| 12/09/2026 | Arquitetura, ambiente, stack e repositório | Registrar decisões e instruções de execução |
| 14/09/2026 | RF01 e RF02 — cadastros | Consolidar campos, validações e relação entre conta e perfil a partir da base existente |
| 21/09/2026 | RF07 — autenticação e acesso | Prioridade seguinte após validar o escopo: conta, persistência, login, autorização e propriedade |
| 28/09/2026 | RF03 — matchmaking | Catálogos, critérios, dados de exemplo, explicações e definição do componente de IA |
| 03/10/2026 | RF04 — perfis compatíveis | Busca, filtros, detalhe e regras de visibilidade |
| 05/10/2026 | RF05 — mensagens e agendamento | Preparar conexão, conversa e reunião antes desta data; o intervalo desde RF04 é curto |
| 24/10/2026 | RF06 — Pitch e Canvas | Modelo de materiais, acesso restrito e edição do Canvas |
| 26/10/2026 | RF11 e RNF03 — políticas e consentimento | Validar textos, finalidades e retenção com Governança antecipadamente |
| 07/11/2026 | RNF02 — proteção de dados | Demonstrar os controles já incorporados e verificar armazenamento/backups |
| 09/11/2026 | RF08 e RF09 — moderação e métricas | Preparar estados e eventos desde os fluxos iniciais; concluir os painéis nesta etapa |
| 16/11/2026 | RF10 — avaliações | Definir evidência de interação e evitar duplicidade |
| 23/11/2026 | RNF07, beta testers, plano de negócios e governança consolidados | Ter produto utilizável e roteiro de validação antes do ensaio |
| 28/11/2026 | RNF01, RNF04 e RNF05 | Evidências de disponibilidade, usabilidade e crescimento; cronograma também menciona desempenho |
| 30/11 a 03/12/2026 | Projetaí; RNF08, RNF09, RNF06 e RNF10 | Demonstração integrada, documentação e auditoria verificadas |
| 07/12/2026 | Recuperação | Consolidação geral |
| 14/12/2026 | Final | Consolidação geral |

Plano de negócios: fechar público inicial, problema, proposta de valor, receita, custos e estratégia de lançamento com a equipe responsável. Governança: fechar políticas, papéis, retenção, auditoria e operação. Verificação e Validação: definir critérios de aceite, massa de dados, beta testers e registro de resultados. São frentes da equipe, não tarefas exclusivas do backend.

RF15 não possui data própria no cronograma do professor. Proposta: validar os benefícios e preparar a demonstração dos planos antes do ensaio de 23/11, sem atrasar os RFs obrigatórios. Se IA ficar exclusiva do Pro, disponibilizar o estado de assinatura demonstrativa necessário à avaliação de RF03 sem depender de cobrança real.

## 11. Decisões que a equipe deve validar

| Decisão | Proposta de partida | Impacto |
|---|---|---|
| Receita | Gratuito e pago com cobrança demonstrativa, confirmado pelo líder; benefícios e preços a validar | Exige RF15 e telas T21–T23; pagamento real fora do escopo |
| Conta e startup | Um responsável por uma startup | Simplifica autorização; equipe multiusuário muda o modelo |
| Acúmulo de papéis | Investidor e mentor combináveis; empreendedor separado inicialmente | Define cadastro e navegação |
| Abrangência | Foco Nordeste/Porto Digital, sem prova de residência obrigatória | Define filtros e posicionamento; não excluir outras regiões sem decisão |
| Liberação de chat | Somente após convite aceito | Define conexão, notificações e métrica de match |
| Moderação | Aprovação antes da primeira publicação | Exige administrador disponível e dados previamente aprovados na demonstração |
| Documentos | Pitch/Canvas restritos a conexões por padrão | Define armazenamento e permissões |
| IA | Similaridade semântica influencia a ordenação; regras garantem elegibilidade e fallback | Exige escolher abordagem, dados permitidos, orçamento e aceite |
| Avaliação | Após reunião concluída, feedback sem ranking público | Define elegibilidade e exposição |
| Reuniões | Agendamento interno, chamada por link externo | Atende o agendamento sem construir videoconferência |
| Exclusão e retenção | Processo definido com Governança | Impacta banco, arquivos, mensagens e logs |
| Operação | Hospedagem, e-mail, armazenamento e responsável por moderação a definir | Determina custo e viabilidade da demonstração |
| Diferencial do Pro | IA semântica como benefício; fluxos essenciais disponíveis no Gratuito | Proposta comercial, ainda não confirmada; define autorização por plano |

## 12. Como usar este documento antes de codar

1. A equipe valida ou altera as propostas da seção 11, mantendo os RFs originais rastreáveis.
2. Frontend revisa telas, ações e estados; backend revisa dados, permissões e transições; testes revisa os critérios de aceite. Uma pessoa pode acumular responsabilidades, mas as decisões devem ser compartilhadas.
3. Cada tarefa cita o requisito correspondente: por exemplo, RF05.02 para aceitar/recusar convite. O contrato de API é definido conjuntamente antes de conectar as telas.
4. Considerar requisito pronto somente quando comportamento, permissão, validação, falha e aceite estiverem compreendidos pela equipe.
5. Começar a implementação pela dependência mais próxima do cronograma, explicando problema, regra, dados, código e verificação em cada incremento. Não implementar todo o catálogo em uma única mudança.

Exemplo de decomposição: “Aceitar solicitação” aparece como botão na T11, depende de RF05.02/RF05.03, só pode ser acionado pelo destinatário, exige estado pendente, muda a solicitação para aceita, cria uma única conexão/conversa e notifica o remetente. O teste deve incluir tentativa por terceiro e clique repetido. Esse nível de entendimento conecta a tela ao backend sem começar pelo código.
