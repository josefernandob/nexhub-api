# Nexhub

Especificação de requisitos do produto

Versão 1.0 | 23 de setembro de 2026

Base de trabalho para design, frontend, backend, documentação e testes.

## 1 Finalidade e uso do documento

O Nexhub é uma plataforma SaaS que conecta startups a investidores anjo e mentores. Seu público inicial é o ecossistema do Nordeste, com destaque para o Porto Digital e a economia criativa. O produto permite apresentar negócios, descobrir oportunidades compatíveis, estabelecer contato e acompanhar as interações em um ambiente único.

Esta versão fixa o escopo da entrega acadêmica. Os requisitos aqui incluídos fazem parte do projeto; não são uma lista de funcionalidades opcionais. A especificação consolida os requisitos do professor e as decisões de produto tomadas para sua implementação, conforme autorização do líder do projeto. Ela substitui a versão 0.1 como referência da equipe. Não representa comprovação de funcionalidades já implementadas ou aprovação do professor sobre os detalhamentos acrescentados.

Design deve usar os fluxos, telas, ações e estados. Frontend e backend devem compartilhar campos, validações e permissões. Documentação deve usar os mesmos nomes e códigos. Testes devem transformar os critérios de aceite em evidências verificáveis. Uma mudança posterior de comportamento deve atualizar esta base e registrar seu impacto antes de alterar telas ou código.

**Leitura dos códigos.** RF identifica requisito funcional; RN identifica regra de negócio; RNF identifica requisito não funcional; T identifica tela; CA identifica cenário de aceite. Os códigos RF01 a RF11 preservam a numeração do professor. Seus subitens detalham a implementação. RF12 a RF15 são funcionalidades adicionais incorporadas ao produto. Códigos estáveis permitem citar uma regra em protótipos, tarefas e testes.

**Fontes.** Requisitos do Sistema do Projeto Integrador do 5º Período ADS, arquivo “Requisitos_-_Projeto_Integrador_5o_Periodo_ADS (1).docx”; Cronograma de Acompanhamento de Entregas, arquivo “Cronograma_de_Entregas_-_Full_Stack_5o_Periodo_ADS.docx”; decisões do líder sobre IA, planos gratuitos e pagos e cobrança demonstrativa. Os documentos originais continuam sendo referência para avaliação acadêmica.

## 2 Escopo fechado da versão acadêmica

O produto terá cadastro e autenticação, perfis moderados, catálogo com filtros, recomendações por afinidade, recomendações semânticas com IA no Pro, favoritos, convites de conexão, mensagens, reuniões, Pitch, Canvas, avaliações privadas, notificações, bloqueios, denúncias, administração, métricas, auditoria, políticas, solicitações de dados e assinatura demonstrativa.

**Decisões de produto.** Uma conta de empreendedor administra exatamente uma startup, com um único responsável. Uma conta profissional atua como investidor, mentor ou ambos. Empreendedor e profissional não se acumulam na mesma conta nesta versão. Administradores são provisionados por processo restrito. O cadastro atende pessoas maiores de 18 anos; a confirmação é declaratória e não equivale a verificação documental.

O foco regional orienta a comunicação e os filtros, mas não impede cadastro de outras localidades brasileiras. O sistema usa português do Brasil, valores em reais e datas exibidas no fuso selecionado, inicialmente America/Fortaleza. Perfis e materiais só são publicados após análise administrativa. A primeira versão não verifica oficialmente a identidade, o CNPJ ou a capacidade financeira dos participantes.

Uma conexão aceita é necessária para conversar e agendar. Pitch e Canvas são restritos a conexões ativas por padrão. O usuário pode publicar esses materiais para outros usuários autenticados. Mensagens são textuais; reuniões são organizadas internamente e realizadas por link externo ou presencialmente. Avaliações são privadas entre participantes, com acesso administrativo somente quando houver denúncia.

**Planos.** Gratuito custa R$ 0. Pro apresenta R$ 49,90 por mês como preço ilustrativo da demonstração, sem cobrança, renovação ou débito automático. O Pro libera a ordenação por IA; todos os fluxos acadêmicos essenciais continuam no Gratuito. A simulação aprovada mantém o Pro ativo até o titular voltar ao Gratuito ou excluir a conta. A cifra é uma decisão para protótipo e demonstração, não uma pesquisa de preço de mercado.

**Fora desta versão.** Pagamento real, intermediação de aportes, contratos de investimento, cobrança de mentoria, verificação documental automática, múltiplas startups por conta, equipe multiusuário dentro da startup, troca de responsável, rede social/feed, anexos no chat, videochamada própria, sincronização com calendários, aplicativo nativo e gestão comercial de investimentos. O plano de negócios pode discutir essas evoluções sem incluí-las na obrigação de implementação.

## 3 Atores e permissões

| Ator | Responsabilidade | Limite |
|---|---|---|
| Visitante | Conhecer a plataforma, planos e políticas; criar conta e entrar | Não acessa o catálogo nem dados de participantes |
| Empreendedor | Manter sua startup e materiais; buscar investidores e mentores; conduzir interações | Não altera startup alheia e não possui perfil profissional na mesma conta |
| Investidor | Informar tese, interesses e aportes; descobrir startups e interagir | Não tem acesso automático a documentos restritos |
| Mentor | Informar especialidades e disponibilidade; descobrir startups e interagir | Não precisa informar valores financeiros |
| Investidor e mentor | Exercer as duas modalidades no mesmo perfil | Preenche ambos os conjuntos de campos |
| Administrador | Moderar, atender solicitações de dados, consultar indicadores e auditoria | Não navega livremente por conversas ou avaliações privadas |

Conta, perfil, papel e plano são conceitos distintos. Conta identifica quem entra. Perfil apresenta a startup ou o profissional. Papel autoriza ações. Plano libera benefícios comerciais. Contratar Pro nunca concede acesso administrativo nem amplia acesso a dados de terceiros.

### 3 1 Matriz de acesso

| Recurso | Titular | Outro usuário autenticado | Conexão ativa | Administrador |
|---|---|---|---|---|
| Perfil publicado | Lê e propõe edição | Lê campos publicados | Lê campos publicados | Modera |
| Rascunho de perfil | Lê e edita | Sem acesso | Sem acesso | Apenas versão submetida |
| Pitch e Canvas restritos | Lê e edita | Sem acesso | Lê versão aprovada | Versão submetida ou evidência denunciada |
| Mensagens | Participante lê histórico permitido | Sem acesso | Participante envia | Somente mensagem denunciada |
| Reuniões e avaliações | Participante consulta | Sem acesso | Participante interage conforme estado | Evidência denunciada quando aplicável |
| E-mail e preferências privadas | Lê e altera campos permitidos | Sem acesso | Sem acesso automático | Somente dados mínimos para suporte autorizado |
| Plano e notificações | Acessa os próprios | Sem acesso | Sem acesso | Consulta de suporte auditada; não contrata pelo usuário |
| Métricas e auditoria global | Sem acesso | Sem acesso | Sem acesso | Consulta autorizada |

O termo “titular” designa a conta proprietária ou participante legítima do recurso. Toda permissão é verificada no backend a cada operação, inclusive quando a interface já estiver aberta. Visibilidade pública nesta especificação significa visível no catálogo autenticado, não publicada na internet sem login.

## 4 Requisitos funcionais

Todos os subitens desta seção integram a versão 1.0. Os critérios transversais, as regras de negócio e o dicionário de dados complementam cada requisito. Termos como “rascunho” e “proposta de reunião” descrevem estados do produto e não indicam que o requisito está indefinido.

### RF01 Cadastro e manutenção de startups

Origem: requisito do professor com detalhamento de produto.

| ID | Comportamento verificável |
|---|---|
| RF01.01 | O empreendedor cria o perfil da startup associado à sua conta autenticada. O responsável vem da sessão, não de uma escolha livre do formulário. |
| RF01.02 | O cadastro registra nome, descrição, segmento principal, estágio, cidade/UF e necessidades. Segmento, estágio e necessidades usam opções padronizadas. |
| RF01.03 | CNPJ, site e logotipo são opcionais. CNPJ informado deve ter formato/dígitos válidos e não pode repetir outra startup; isso não representa verificação oficial da empresa. |
| RF01.04 | Necessidades aceitam múltipla escolha: investimento, mentoria de negócios, técnica, comercial conforme o catálogo da seção 7. |
| RF01.05 | Se procura investimento, informa valor pretendido positivo em BRL. Se procura mentoria, seleciona áreas desejadas. |
| RF01.06 | O responsável salva rascunho incompleto, edita e visualiza seu perfil. Publicação exige campos obrigatórios completos. |
| RF01.07 | “Enviar para análise” coloca o cadastro em revisão; aprovação administrativa o torna visível na descoberta. Rejeição apresenta motivo e permite corrigir e reenviar. |
| RF01.08 | “Pausar perfil” retira a startup de novas descobertas e recomendações. “Reativar” restaura a visibilidade apenas se aprovada e com conta ativa. |

Critério de aceite: uma startup incompleta pode permanecer em rascunho, mas não ser publicada. Outra conta não consegue editá-la, inclusive por acesso direto à API.

### RF02 Cadastro e manutenção de investidores e mentores

Origem: requisito do professor com detalhamento de produto.

| ID | Comportamento verificável |
|---|---|
| RF02.01 | O usuário escolhe investidor, mentor ou ambos e informa nome, biografia, cidade/UF e interesses. O e-mail pertence à conta. |
| RF02.02 | Investidor informa segmentos, estágios de interesse, tese de investimento, ticket médio, faixa de aporte mínimo/máximo em BRL e atuação geográfica. Mentor também informa segmentos e estágios atendidos. |
| RF02.03 | Mentor informa especialidades, experiência resumida, horas disponíveis por mês e formato de atendimento remoto/presencial/ambos. |
| RF02.04 | O perfil “ambos” preenche os dois conjuntos. Alterar a modalidade solicita os campos que faltam antes da publicação. |
| RF02.05 | O usuário salva, edita, envia à análise, pausa e reativa seu perfil seguindo regras equivalentes às de startup. |
| RF02.06 | Preferências estruturadas alimentam as recomendações; campos vazios não são interpretados como qualquer interesse. |

Critério de aceite: mentor não é obrigado a declarar aporte. Investidor não publica faixa negativa ou mínimo maior que máximo. Ticket médio é um campo próprio, obrigatório para investidor, dentro da faixa mínima/máxima.

### RF03 Matchmaking e recomendação com IA

Origem: afinidade exigida pelo professor e IA incorporada ao Nexhub.

| ID | Comportamento verificável |
|---|---|
| RF03.01 | Investidores recebem startups compatíveis com seus interesses; mentores recebem startups que precisam de suas especialidades. |
| RF03.02 | Startups recebem investidores e mentores compatíveis com segmento, estágio e necessidades. |
| RF03.03 | Apenas perfis completos, publicados, aprovados e ativos são elegíveis. Bloqueios entre participantes excluem o par das sugestões. |
| RF03.04 | A afinidade considera segmento, estágio, necessidade e critérios específicos: faixa de aporte para investimento e especialidade/disponibilidade para mentoria. |
| RF03.05 | Cada cartão mostra os principais motivos da recomendação e índice de compatibilidade de 0 a 100. Esse índice representa afinidade, não chance de retorno financeiro. |
| RF03.06 | Alterações publicadas em campos relevantes invalidam as recomendações anteriores. A próxima consulta recalcula a afinidade e atualiza a análise semântica quando autorizada pelo plano e pela preferência de IA. |
| RF03.07 | “Não tenho interesse” oculta a sugestão para o usuário atual. Ele pode consultar e restaurar sugestões ocultadas. |
| RF03.08 | Perfil sem dados suficientes apresenta os campos que faltam. Ausência de resultados apresenta estado vazio e opção de explorar com outros filtros. |
| RF03.09 | No Pro, com análise inteligente habilitada, um componente de IA compara semanticamente a descrição da startup com a tese do investidor ou atuação do mentor e influencia a ordenação. A IA não pode contornar filtros, bloqueios ou restrições de acesso. O processamento de dados para IA é descrito na seção 6. |
| RF03.10 | O sistema conserva a versão do mecanismo, data e critérios usados para permitir explicar o resultado e comparar versões. |
| RF03.11 | Falha ou limite do serviço de IA aciona classificação básica por regras e sinaliza a indisponibilidade da análise inteligente. A descoberta continua funcionando. |
| RF03.12 | A IA utiliza somente informações autorizadas para recomendação. Conversas privadas, documentos restritos e dados de outras contas não entram automaticamente no processamento. |

Aceite da afinidade: com perfis de teste previamente definidos, mudar segmento/estágio/interesse deve alterar o resultado de maneira explicável; perfil suspenso nunca é recomendado.

Aceite da IA: aplicar a fórmula, os limites e a base de avaliação definidos na seção 6. A comparação semântica deve alterar a ordenação de pares textualmente diferentes e relevantes, preservando todas as restrições de elegibilidade.

Vocabulário: recomendação é uma sugestão do sistema; solicitação é um convite para conversar; match é uma conexão aceita. Essa definição evita contar cada visualização de uma recomendação como um novo match.

### RF04 Descoberta e visualização de perfis

Origem: requisito do professor com detalhamento de produto.

| ID | Comportamento verificável |
|---|---|
| RF04.01 | Usuário autenticado consulta catálogo paginado de perfis publicados, com busca por nome e filtros de segmento, estágio, localização e modalidade aplicável. |
| RF04.02 | Pode ordenar por compatibilidade quando houver perfil suficiente ou por cadastro mais recente. Limpar filtros restaura a busca padrão. |
| RF04.03 | O cartão mostra nome, resumo, segmento/especialidade, localização, estágio quando aplicável e motivo de afinidade quando disponível. |
| RF04.04 | “Ver perfil” abre informações completas autorizadas antes de qualquer contato. E-mail e contatos pessoais ficam privados por padrão. |
| RF04.05 | O perfil da startup mostra apresentação, necessidades, Pitch e Canvas conforme a visibilidade definida. O de investidor/mentor mostra atuação e preferências. |
| RF04.06 | “Conectar” permite iniciar o fluxo de convite. O botão mostra estados diferentes para solicitação pendente, conexão aceita ou interação indisponível. |

Critério de aceite: resultados respeitam filtros combinados e não revelam perfis em rascunho, suspensos ou bloqueados. Acesso direto também verifica visibilidade; perfis pausados só permanecem acessíveis ao titular, à moderação autorizada e a conexões já ativas conforme RN03.

### RF05 Comunicação e agendamento

Origem: comunicação exigida pelo professor. O aceite de conexão é uma regra do Nexhub.

| ID | Comportamento verificável |
|---|---|
| RF05.01 | Startup ou investidor/mentor envia solicitação com finalidade de investimento, mentoria ou ambas e mensagem inicial de até 500 caracteres. |
| RF05.02 | O destinatário aceita ou recusa; o remetente cancela enquanto pendente. Não pode haver duas solicitações pendentes ou conexões ativas para o mesmo par startup-profissional. |
| RF05.03 | Aceitar cria uma conexão e disponibiliza uma conversa. Recusar ou cancelar não libera mensagens. Nova tentativa após recusa somente depois de 7 dias. |
| RF05.04 | Participantes de conexão ativa enviam texto de 1 a 2.000 caracteres, consultam histórico paginado e veem autor, data/hora e falha de envio. Texto só com espaços é inválido. |
| RF05.05 | Repetir um envio após falha não deve duplicar mensagem já registrada. Conteúdo digitado é preservado durante a tentativa. |
| RF05.06 | A lista de conversas mostra última mensagem e quantidade não lida. Abrir a conversa marca as mensagens exibidas como lidas para aquele participante. |
| RF05.07 | Um participante propõe reunião com assunto, data, horário, duração, fuso, modalidade e local ou link externo HTTPS. O autor é o organizador. O link ou local deve estar preenchido antes da confirmação. |
| RF05.08 | O destinatário confirma, recusa ou propõe outro horário. Uma alteração de horário exige nova confirmação da outra parte. |
| RF05.09 | Ambos consultam reuniões propostas, confirmadas, canceladas e concluídas; podem cancelar informando motivo. Horários passados não são aceitos para nova reunião. |
| RF05.10 | O sistema impede conflito entre reuniões confirmadas dos participantes. Horários são armazenados com referência consistente e exibidos no fuso informado. |
| RF05.11 | Depois do horário final de reunião confirmada, o organizador registra conclusão ou ausência. A conclusão libera avaliação para os dois participantes. O outro participante pode denunciar registro incorreto, que será analisado sem alteração silenciosa do histórico. |
| RF05.12 | Encerrar conexão impede novas mensagens e propostas e cancela reuniões futuras entre o par. Histórico autorizado permanece consultável; os materiais restritos deixam de estar acessíveis ao outro participante. |

Critério de aceite: terceiro não lê mensagens nem altera reunião alheia. Dois aceites simultâneos não criam duas conversas. Uma confirmação não gera conflito de agenda. A conversa aberta deve apresentar novas mensagens em até 5 segundos em condições normais; não exige WebSocket ou indicador de digitação.

### RF06 Pitch e modelo de negócios Canvas

Origem: requisito do professor com detalhamento de produto.

| ID | Comportamento verificável |
|---|---|
| RF06.01 | Responsável cadastra resumo do pitch e pelo menos um formato de apresentação: link HTTPS de vídeo/apresentação ou PDF de até 10 MB; pode fornecer ambos. |
| RF06.02 | Preenche Canvas em nove blocos: segmentos de clientes, proposta de valor, canais, relacionamento, fontes de receita, recursos principais, atividades principais, parcerias principais e estrutura de custos. |
| RF06.03 | Salva materiais em rascunho, pré-visualiza e envia a versão para publicação. Alteração sujeita à moderação não substitui a versão aprovada antes de aprovação. |
| RF06.04 | Define visibilidade do Pitch e do Canvas separadamente: usuários autenticados ou apenas conexões aceitas. Padrão: apenas conexões. |
| RF06.05 | “Ver pitch” e “Ver Canvas” verificam permissão também no servidor. Link direto de arquivo não deve permitir acesso permanente sem autorização. |
| RF06.06 | Material restrito apresenta mensagem de acesso limitado e possibilidade de solicitar conexão, sem expor seu conteúdo. |

Critério de aceite: usuário sem conexão não abre material restrito mesmo copiando a URL de outra sessão. O perfil básico permanece suficiente para avaliar interesse antes do contato. Pitch e Canvas não bloqueiam a publicação inicial da startup. Sua publicação separada exige os campos próprios completos.

### RF07 Autenticação e autorização

Origem: requisito do professor com detalhamento de produto.

| ID | Comportamento verificável |
|---|---|
| RF07.01 | Cadastro cria conta com nome, e-mail único, senha e perfil permitido; e-mail é normalizado e senha deve ter entre 12 e 128 caracteres. |
| RF07.02 | Login autentica por e-mail/senha; falha usa mensagem genérica, sem distinguir conta inexistente de senha errada. |
| RF07.03 | Sessão identifica a conta e os papéis autorizados. Logout invalida a sessão atual; sessão expirada solicita novo login. |
| RF07.04 | Toda ação protegida valida autenticação, papel, estado da conta e propriedade do recurso no backend. Ocultar botão não substitui autorização. |
| RF07.05 | Administradores são provisionados por processo restrito; cadastro público ou edição de perfil não pode promover usuário a administrador. |
| RF07.06 | Conta suspensa não inicia sessão utilizável nem continua operações com sessão antiga. |
| RF07.07 | Recuperação de senha usa link temporário de uso único, com validade de 30 minutos, resposta genérica e invalidação de sessões após redefinição. |
| RF07.08 | Confirmação de e-mail usa link temporário com reenvio limitado; contato com outros usuários exige e-mail confirmado. O envio de e-mail transacional integra o escopo. |

Critério de aceite: empreendedor não acessa moderação; investidor não altera startup; alterar um identificador na requisição não amplia permissões. A conta de demonstração do administrador não deve ser criada por endpoint público.

### RF08 Moderação administrativa

Origem: requisito do professor com detalhamento de produto.

| ID | Comportamento verificável |
|---|---|
| RF08.01 | Administrador consulta fila de perfis e materiais pendentes, com filtros por tipo e estado. |
| RF08.02 | Abre o conteúdo submetido e aprova ou rejeita. Rejeição exige justificativa visível ao responsável. |
| RF08.03 | Suspende e reativa contas com motivo; remove conteúdo de exibição sem apagar o registro da decisão. |
| RF08.04 | Usuário denuncia perfil, material, avaliação ou mensagem, escolhendo motivo e descrição. Denunciar não suspende automaticamente o denunciado. |
| RF08.05 | Administrador classifica a denúncia como aberta, em análise ou concluída, registra decisão e acesso apenas à evidência necessária. |
| RF08.06 | Cada ação administrativa registra autor, data, recurso, ação e motivo em auditoria não editável pela interface. |

Critério de aceite: reprovação não equivale a excluir conta. Perfil suspenso desaparece da descoberta. O administrador não obtém acesso livre a todos os chats; o acesso limita-se à evidência enviada na denúncia e é auditado.

### RF09 Métricas de uso

Origem: requisito do professor com detalhamento de produto.

| ID | Comportamento verificável |
|---|---|
| RF09.01 | Administrador consulta número de matches, conversas iniciadas e reuniões agendadas por período. |
| RF09.02 | Match conta a primeira aceitação de uma conexão; sugestão exibida e convite enviado não contam como match. |
| RF09.03 | Conversa iniciada conta a primeira mensagem enviada em uma conversa, não a simples criação do canal. |
| RF09.04 | Reunião agendada conta a primeira confirmação de uma reunião. Reagendamento do mesmo registro não cria outra contagem; cancelamentos aparecem separadamente. |
| RF09.05 | Painel informa intervalo, fuso e data de atualização; considera a data do evento correspondente para cada indicador. |
| RF09.06 | Apresenta startups publicadas, investidores/mentores ativos e solicitações pendentes. |

Critério de aceite: repetir uma confirmação não altera a contagem. Histórico de eventos preserva indicadores mesmo quando um perfil deixa de estar visível, respeitando anonimização e retenção definidas na seção 8.

### RF10 Feedback e avaliação após interação

Origem: avaliação pós-interação exigida pelo professor. O Nexhub exige reunião concluída.

| ID | Comportamento verificável |
|---|---|
| RF10.01 | Após reunião concluída, cada participante avalia o outro uma vez por reunião, com nota inteira de 1 a 5 e comentário opcional de até 1.000 caracteres. |
| RF10.02 | Avaliação registra autor, destinatário, reunião e data. Autorrevisão e avaliação por terceiros são proibidas. |
| RF10.03 | O destinatário consulta feedback recebido; mantém comentário entre participantes e moderação autorizada, sem ranking público. |
| RF10.04 | Usuário denuncia avaliação abusiva; administrador pode ocultá-la com motivo e auditoria. |

Critério de aceite: não é possível avaliar reunião apenas proposta, cancelada ou marcada como ausência. Duas requisições idênticas não criam avaliações duplicadas. Conversa encerrada, isoladamente, não habilita avaliação.

### RF11 Políticas e consentimentos

Origem: professor, com dependência de RNF03. Este documento descreve comportamento do produto; não substitui validação jurídica ou as políticas da disciplina de Governança.

| ID | Comportamento verificável |
|---|---|
| RF11.01 | Cadastro apresenta links para política de privacidade e termos de uso antes da conclusão. |
| RF11.02 | Sistema registra aceite dos termos com usuário, versão e data/hora. Caixas não vêm previamente selecionadas. |
| RF11.03 | O cadastro separa aceite dos termos, ciência da política e confirmação de maioridade. O tratamento opcional de texto de perfil por IA é habilitado em Configurações por finalidade específica, inicialmente desativado. Não existe marketing por e-mail nesta versão. |
| RF11.04 | Configurações permitem consultar políticas vigentes e histórico de aceite, além de revogar consentimentos opcionais. |
| RF11.05 | Usuário solicita correção ou exclusão de dados e acompanha estado do pedido. Exclusão exige confirmação e nova autenticação. |
| RF11.06 | Exclusão confirmada desativa a conta imediatamente e abre protocolo para expurgo e anonimização conforme a seção 8. O usuário acompanha o pedido por e-mail; não depende de manter sessão na conta excluída. |

Critério de aceite: o registro de aceite corresponde à versão exibida. Revogação de finalidade opcional interrompe aquele uso. A disciplina de Governança fornece os textos de política e sua fundamentação; o comportamento e os prazos operacionais do sistema constam da seção 8.

### RF12 Notificações internas

Origem: funcionalidade adicional incorporada ao Nexhub.

- RF12.01: notificar recebimento/aceite/recusa de convite, nova mensagem, proposta/alteração/cancelamento de reunião e decisão de moderação.
- RF12.02: exibir contador de não lidas, marcar individualmente ou todas como lidas e abrir o recurso relacionado.
- RF12.03: revalidar acesso ao abrir notificação; se o recurso foi removido ou a permissão revogada, informar indisponibilidade.
- Aceite: notificação pertence apenas ao destinatário e não expõe o texto de uma mensagem privada a outra conta.

### RF13 Favoritos

Origem: funcionalidade adicional incorporada ao Nexhub.

- RF13.01: salvar/remover perfil de uma lista pessoal, sem avisar o outro usuário e sem criar match.
- RF13.02: listar favoritos paginados e indicar indisponibilidade de perfil que deixou de ser elegível, sem revelar conteúdo restrito.

### RF14 Bloqueio e encerramento de contato

Origem: funcionalidade adicional incorporada ao Nexhub.

- RF14.01: bloquear outro participante, impedindo novas solicitações, mensagens e recomendações entre o par.
- RF14.02: confirmar o bloqueio e informar seu efeito nas reuniões futuras; cancelar reuniões pendentes/futuras entre o par e notificar cancelamento sem revelar o motivo do bloqueio.
- RF14.03: permitir desbloquear, sem restaurar automaticamente conexão ou reuniões anteriores.
- Aceite: sessão antiga não consegue enviar mensagem depois do bloqueio; histórico não é apagado automaticamente.

### RF15 Planos e assinatura demonstrativa

Origem: planos gratuitos e pagos com cobrança demonstrativa definidos pelo líder; benefícios e regras fixados nesta versão.

| ID | Comportamento verificável |
|---|---|
| RF15.01 | Exibir plano Gratuito e plano Pro com descrição, benefícios, limites e indicação explícita de demonstração. Valores exibidos: Gratuito R$ 0 e Pro R$ 49,90/mês, identificado como preço ilustrativo sem cobrança. |
| RF15.02 | Nova conta elegível inicia no Gratuito. A assinatura vinculada à conta; administrador não contrata plano. |
| RF15.03 | “Simular contratação” abre resumo com plano, benefícios e aviso de que nenhum valor será cobrado. Não solicita cartão, Pix, CPF de cobrança ou dados bancários reais. |
| RF15.04 | Na demonstração, permitir testar aprovação e recusa do pagamento simulado. Apenas aprovação ativa o Pro; recusa mantém o plano anterior e permite nova tentativa. |
| RF15.05 | Registrar identificador da operação, conta, plano, data, resultado e marcação de simulação. Repetir a confirmação não cria duas assinaturas ou duas alterações. |
| RF15.06 | Mostrar plano atual, benefícios ativos e histórico de mudanças. Nenhum recibo deve parecer comprovante de pagamento real. |
| RF15.07 | Gratuito permite os fluxos essenciais, inclusive recomendações por regras, contato, materiais e avaliações. Pro libera a ordenação semântica e justificativas ampliadas para a conta assinante, quando a análise inteligente estiver habilitada. A contraparte não precisa contratar Pro. |
| RF15.08 | Ao acessar benefício Pro no Gratuito, apresentar explicação e botão “Ver planos”. O backend também verifica o plano; esconder o recurso na tela não basta. |
| RF15.09 | “Voltar ao Gratuito” pede confirmação, aplica mudança imediatamente nesta simulação e preserva perfil, conexões, mensagens, reuniões e materiais existentes. Novas consultas usam os recursos do plano Gratuito. |
| RF15.10 | Informar que não existe renovação nem débito automático nesta versão demonstrativa. A simulação não vence por calendário; o titular encerra o Pro pelo retorno ao Gratuito. |

Critério de aceite: conta gratuita não obtém recurso Pro alterando a requisição; contratação simulada aprovada libera o benefício; simulação recusada não altera assinatura; retorno ao Gratuito não apaga dados. A apresentação acadêmica deve incluir uma conta Pro demonstrativa, com os mesmos controles de acesso das demais contas.

Não há cota comercial de mensagens, conexões ou favoritos nesta versão. Limites técnicos de proteção contra abuso se aplicam a ambos os planos.


## 5 Regras de negócio e jornadas

### RN01 Cadastro e ativação

O visitante escolhe Empreendedor, Investidor, Mentor ou Investidor e mentor. Administrador não aparece no formulário. Ao criar a conta, recebe e-mail de confirmação e segue para o preenchimento do perfil. O link de confirmação vale 24 horas e pode ser reenviado após 60 segundos, no máximo 5 vezes por hora por conta. Novo envio invalida o link anterior. Link usado ou expirado apresenta “Este link não é mais válido” e ação de reenvio.

Antes de confirmar e-mail e publicar perfil, a conta pode completar dados, consultar políticas, configurações e planos. O catálogo é liberado após e-mail confirmado; iniciar/aceitar conexão exige também perfil publicado e ativo dos dois lados. O usuário vê uma lista objetiva de pendências. Conta não ganha visibilidade apenas por existir.

A classe Empreendedor ou Profissional não muda após o cadastro. No perfil profissional, é permitido acrescentar atuação de investidor ou mentor após preencher os campos necessários e submeter a alteração. Remover uma modalidade não é permitido enquanto houver convites pendentes ou conexões ativas daquela finalidade; a tela identifica os vínculos a encerrar. Não se cria outra conta automaticamente.

### RN02 Perfil e revisão administrativa

Conteúdo em rascunho é salvo explicitamente, com data da última gravação. “Enviar para análise” valida publicação e cria uma versão imutável para revisão. Enquanto pendente, o usuário pode “Retirar da análise”, voltando ao rascunho; não edita silenciosamente o conteúdo que o administrador está avaliando.

Aprovação publica a versão; rejeição preserva o rascunho e apresenta motivo. Em perfil já publicado, a versão aprovada continua visível enquanto a nova é revisada. Nome de exibição, biografia, descrição, imagem, site, segmento, estágio, interesses e dados profissionais exibidos passam por revisão. Preferência de IA, plano, bloqueios e pausa têm efeito imediato e não aguardam moderação.

Se duas decisões administrativas disputarem a mesma revisão, apenas a primeira válida altera o estado. A segunda tela informa “Esta solicitação já foi analisada”. Após suspensão, nenhuma revisão pendente pode publicar conteúdo até a reativação. A reativação administrativa restaura o estado de visibilidade anterior, sem transformar perfil pausado em ativo.

### RN03 Pausa e suspensão

Pausar retira o perfil do catálogo, de favoritos visíveis e de novas recomendações. Impede novos convites, mas preserva mensagens e reuniões de conexões já ativas. Conexões existentes podem abrir o perfil aprovado e seus materiais autorizados. Reativar exige conta ativa e versão aprovada. A pausa não suspende assinatura demonstrativa.

Suspensão administrativa revoga sessões, oculta o perfil e impede toda nova interação. Convites pendentes são cancelados, conexões são encerradas e reuniões futuras são canceladas. Reativação não restaura vínculos cancelados. O usuário recebe motivo e canal de contato institucional informado pela equipe na política. A remoção de um material específico não implica suspensão da conta.

### RN04 Descoberta e filtros

Empreendedor explora profissionais; profissionais exploram startups. Não há busca de investidor por investidor nem rede entre empreendedores nesta versão. Busca ignora diferenças de maiúsculas e acentos. Filtros de grupos diferentes se combinam por E; opções dentro do mesmo filtro se combinam por OU. Perfil ainda não publicado permite navegação no catálogo depois da confirmação do e-mail, mas não recomendações personalizadas ou contato.

Os resultados usam 20 itens por página, com máximo técnico de 100. Busca e filtros são preservados ao abrir um perfil e voltar. Relevância usa a afinidade definida na seção 6; empate é resolvido por publicação mais recente e identificador estável. A opção “Mais recentes” considera a primeira publicação, não cada edição. Explorar pode mostrar perfis com afinidade baixa; Recomendações usa o limiar definido.

### RN05 Convite e conexão

Somente startup e profissional podem formar um par. Finalidade de investimento exige necessidade de investimento na startup e modalidade de investidor no profissional; mentoria exige necessidade e atuação correspondente; “ambas” exige as duas. Pontuação baixa não impede convite a um perfil encontrado por busca.

Mensagem de convite é obrigatória, com 10 a 500 caracteres. Existe no máximo um convite pendente por par, em qualquer direção. Convite cruzado informa o convite recebido e oferece “Ver solicitação”; não aceita automaticamente. O destinatário pode aceitar ou recusar, e o remetente pode cancelar. Recusa não exige justificativa. Convite expira após 14 dias sem resposta.

Aceite cria ou reativa a conexão do par e abre uma única conversa permanente. Reabrir conexão reutiliza o histórico ainda permitido; não duplica canal nem métrica histórica de primeiro match. Após recusa, o remetente aguarda 7 dias para reenviar, mas o destinatário que recusou pode iniciar novo convite a qualquer momento. Cancelamento ou expiração permite nova tentativa após 24 horas. Encerramento voluntário de conexão permite novo convite após 7 dias. Bloqueio prevalece sobre todos os prazos.

### RN06 Mensagens e histórico

A conversa só aceita texto. Não haverá edição, exclusão individual, anexos, áudio, indicador de digitação ou confirmação pública de leitura nesta versão. O sistema mantém contagem pessoal de não lidas. “Enviar” exige texto não vazio e conexão ativa. O envio recebe uma chave para impedir duplicidade em tentativas repetidas; mensagem falha mantém o texto e apresenta “Tentar novamente”.

Novas mensagens aparecem em até 5 segundos na conversa aberta. O histórico inicial carrega as últimas 30 mensagens, com “Carregar anteriores”. A mensagem inicial do convite é mostrada como contexto da conexão e não conta como primeira mensagem do chat. Participantes de conexão encerrada podem ler histórico, mas não enviar. Bloqueio não apaga evidências.

### RN07 Agendamento e reagendamento

Cada reunião tem exatamente os dois participantes da conexão. O autor da primeira proposta é o organizador. Reunião remota exige link HTTPS; presencial exige local de 5 a 300 caracteres. A outra parte confirma ou recusa. Reunião não confirmada até seu horário inicial expira. Não há reunião recorrente, convidados externos ou integração de calendário.

O conflito ocorre quando intervalos confirmados se sobrepõem para qualquer participante: início anterior ao fim existente e fim posterior ao início existente. Reuniões consecutivas que apenas compartilham um horário de fronteira são permitidas. Propostas pendentes não reservam agenda; o conflito é verificado novamente e de forma indivisível ao confirmar.

Qualquer participante pode propor novo horário. Só existe uma contraproposta pendente por reunião. O outro participante aceita ou recusa a revisão. Enquanto isso, o horário confirmado original continua reservado e válido. Aceitar substitui a reserva numa única operação; recusar ou retirar mantém a anterior. Se o horário original chegar antes do aceite, a revisão pendente expira. Confirmação recebida após mudança de versão é recusada com orientação para atualizar.

Cancelar exige motivo de 10 a 500 caracteres e notifica o outro participante. Reunião encerrada não volta ao estado confirmado. Após o horário final, o organizador marca “Concluída” ou “Não realizada”, indicando ausência própria, da outra parte ou de ambas. A classificação de ausência não cria punição automática nem avaliação. Reunião passada ainda sem classificação aparece como “Aguardando registro”, sem liberar avaliação.

### RN08 Avaliações

Cada participante pode avaliar a contraparte uma vez por reunião concluída. Nota é de 1 a 5; comentário opcional tem até 1.000 caracteres. Na conta profissional, o destinatário é o perfil profissional; do lado empreendedor, é a startup representada. Não haverá edição de avaliação ou ranking público na versão 1.0.

Autor e destinatário consultam a avaliação. Bloqueio impede nova avaliação entre o par, mas mantém registros anteriores e a possibilidade de denunciar. Cancelamento, ausência e simples troca de mensagens não habilitam avaliação. Moderação pode ocultar conteúdo abusivo, preservando a decisão e o motivo para os participantes; não altera nota para criar um resultado diferente do enviado.

### RN09 Materiais e privacidade

Pitch e Canvas são recursos separados, cada um com rascunho, revisão, versão aprovada e visibilidade própria. O primeiro exige resumo de 50 a 2.000 caracteres e link ou PDF. O Canvas exige seus nove blocos, cada um com 20 a 3.000 caracteres. Materiais podem ser publicados depois do perfil básico, sem bloquear a primeira descoberta.

Troca de texto, PDF ou link exige nova análise. Reduzir visibilidade de autenticados para conexões é imediato; ampliar exige confirmação explícita, com efeito sobre a versão já aprovada. “Retirar de publicação” oculta imediatamente o material e preserva o rascunho do responsável. Arquivos são entregues por rota autenticada que revalida o acesso a cada solicitação; não existe link público permanente.

O logotipo publicado pode ser público como recurso visual; PDF não. Links externos de pitch ou reunião podem ser acessíveis fora do Nexhub conforme as configurações do serviço de destino. A interface avisa isso ao cadastrar link e não promete controlar arquivos já baixados ou links de terceiros. O sistema não busca URLs arbitrárias no servidor para gerar prévias.

### RN10 Bloqueios e denúncias

Qualquer participante pode bloquear a contraparte a partir do perfil ou conversa. A confirmação informa que convites serão cancelados, conexão encerrada e reuniões futuras canceladas. Materiais restritos deixam de ser acessíveis. Desbloquear apenas remove a restrição imposta pelo autor; se a contraparte também bloqueou, a interação continua impedida. Vínculos anteriores não são restaurados.

Denúncia exige motivo padronizado e descrição de 10 a 1.000 caracteres. Motivos: assédio, spam, informação enganosa, conteúdo inadequado, violação de privacidade ou outro. O denunciante vê protocolo, estado e resultado resumido, sem identidade de terceiros. Denunciar não equivale a bloquear e não oculta conteúdo automaticamente. A evidência preserva apenas o item denunciado, sem abrir toda a conversa ao administrador.

### RN11 Métricas

Um match é a primeira aceitação do par startup–profissional ao longo de sua existência. Uma conversa iniciada é a primeira mensagem válida de seu canal. Reunião agendada é a primeira confirmação do registro, mesmo que posteriormente reagendada ou cancelada. Cada evento é contado uma vez. Cancelamentos e conclusões possuem indicadores separados e data de ocorrência própria.

Período padrão: últimos 30 dias corridos, incluindo hoje. Filtros de data são inclusivos no fuso do painel; a implementação usa intervalo do início do primeiro dia até o início do dia seguinte ao último. Indicadores de eventos mostram ocorrências no intervalo; contadores de perfis ativos/publicados são fotografia atual, identificada como tal. Não se somam investidores e mentores para obter pessoas únicas, pois um usuário pode ter ambos os papéis. Falha de consulta apresenta erro, nunca zero artificial.

### RN12 Planos e proteção contra abuso

Assinatura pertence à conta. Gratuito e Pro permitem perfis, convites, mensagens, agenda, materiais, avaliações e favoritos. O Pro aprimora a ordenação para quem consulta; não libera acesso a materiais privados de quem não autorizou. Ao retornar ao Gratuito, recomendações básicas substituem a ordenação Pro na próxima consulta e resultados de IA deixam de aparecer para aquela conta; todos os dados e vínculos do usuário permanecem.

Contratação exige e-mail confirmado e conta ativa, mas não aprovação do perfil. O resumo mostra plano, preço ilustrativo, inexistência de cobrança e duração sem renovação automática. “Simular aprovação” e “Simular recusa” são identificados claramente como controles de demonstração. Operações não podem aceitar valor ou titular arbitrário informado pela interface. O servidor usa o plano e a conta da sessão.

Limites iniciais de proteção: 20 novos convites por conta a cada 24 horas; 30 mensagens por minuto por conta; 60 buscas por minuto por conta; 10 novos uploads por hora por conta. Esses limites usam janelas móveis, valem para ambos os planos e apresentam tempo para nova tentativa. Não são limites comerciais exibidos como benefício do Pro.

## 6 Recomendação e inteligência artificial

### 6 1 Elegibilidade e pontuação básica

Antes de calcular pontuação, o sistema exige perfis aprovados e ativos, contas habilitadas, finalidade compatível, ausência de bloqueio, ausência de conexão ativa e ausência de convite pendente. Ocultação pessoal exclui a sugestão somente da lista de quem a ocultou. Recomendações aceitam apenas candidatos dentro da abrangência geográfica selecionada. A busca manual continua disponível fora das preferências de recomendação.

Para investimento, a pontuação B soma: 40 pontos se o segmento principal da startup está nos segmentos do investidor; 25 se o estágio está nos estágios de interesse; 25 se o valor pretendido está entre aporte mínimo e máximo; 10 pela correspondência de atuação geográfica. Critérios não atendidos recebem zero. Para mentoria, B soma: 25 por segmento; 20 por estágio; até 45 pela proporção de necessidades de mentoria da startup cobertas pelas especialidades do mentor; 10 pela compatibilidade de atendimento e geografia.

O termo “mesma localização” para atuação presencial significa mesma cidade/UF. Profissional remoto pode atender qualquer cidade dentro de sua abrangência geográfica. Investidor escolhe Brasil ou uma lista de UFs. Mentor escolhe remoto, presencial ou ambos; startup também informa seu formato de mentoria desejado. Segmentos e estágios são conjuntos selecionáveis, nunca inferidos como “todos” quando vazios.

Sugestões exigem B maior ou igual a 40, mesmo no Pro. Perfil “ambos” calcula investimento e mentoria separadamente, exibe uma única vez a maior pontuação e indica a modalidade correspondente. Empate favorece investimento apenas para ordenação determinística; a interface também informa a afinidade de mentoria quando existente. O índice é exibido como “Compatibilidade 78/100”, sem promessa de sucesso financeiro.

### 6 2 Análise semântica do Pro

O componente de IA compara significado dos textos usando representações semânticas. A abordagem de referência é comparar embeddings, isto é, representações numéricas do sentido de cada texto. A conta profissional fornece tese de investimento ou descrição de atuação; a startup fornece descrição do negócio. A similaridade por cosseno é limitada ao intervalo 0 a 1, multiplicada por 100 e chamada S. A pontuação Pro é o inteiro arredondado de 0,70 × B + 0,30 × S.

Exemplo: B igual a 80 e S igual a 90 produzem compatibilidade 83/100. Os critérios objetivos continuam sendo exibidos. A explicação apresenta até três razões verificáveis, como segmento e estágio compatíveis, e informa “afinidade semântica da descrição” quando essa parcela existir. Não gera afirmações sobre faturamento, retorno, credibilidade ou dados ausentes. Conteúdo escrito pelo usuário é dado a comparar, nunca instrução para executar ações.

O benefício funciona na descoberta recíproca: profissional Pro recebe startups ordenadas semanticamente; empreendedor Pro recebe profissionais compatíveis. A contraparte pode ser Gratuita. Todos precisam ter habilitado o uso de seu texto nessa finalidade para que o par use semântica. Se qualquer lado não habilitou, o par usa B e mostra “Compatibilidade por critérios”; sua presença no catálogo não depende de aceitar IA.

### 6 3 Atualização e falhas

O usuário Pro habilita “Análise inteligente” em Configurações, após ler a finalidade. Contas Gratuitas também podem autorizar o uso de seu texto para aparecer na análise de assinantes; isso não lhes concede o benefício Pro. A opção vem desligada. Revogar exclui os vetores derivados ativos em até 24 horas e impede imediatamente novas análises com esse texto. A versão publicada determina os dados analisados; rascunhos não entram no cálculo.

Entradas da IA se limitam ao texto autorizado, categorias e finalidade. E-mail, CNPJ, chat, avaliações, anexos e Canvas restrito não são enviados ao componente. A integração com provedor externo, se usada, deve registrar o provedor na política e não autorizar uso secundário para treinar modelos. Modelo e provedor são decisões técnicas documentadas, sem alterar o fluxo de produto definido aqui.

A análise deve retornar em até 10 segundos por consulta interativa; ao exceder esse tempo ou falhar, a tela entrega a classificação básica e o aviso “A análise inteligente está indisponível. Exibindo compatibilidade por critérios”. Não bloqueia a busca. Reutiliza resultados enquanto os textos publicados não mudarem e revalida elegibilidade a cada leitura. Registra versão do motor/modelo e referência das versões de perfil usadas, sem reter conteúdo desnecessário.

### 6 4 Critério de qualidade

Antes da entrega, a equipe prepara 30 pares sintéticos revisados por duas pessoas: 10 pares com redações diferentes e sentido compatível, 10 incompatíveis e 10 casos de fronteira. Divergências de classificação são resolvidas antes do ensaio. Em pelo menos 8 de 10 comparações pareadas com B igual, o par semanticamente compatível deve receber S superior ao incompatível. Todos os casos devem respeitar bloqueios, publicação e autorização de uso de texto.

O relatório registra entradas sintéticas, versão do modelo, resultados, falhas e revisão humana das justificativas. Esse é um critério de aceite definido para o projeto, não uma alegação de precisão já medida. Seleção de fornecedor deve respeitar o orçamento de operação aprovado pela liderança antes de gerar custo; a demonstração pode usar processamento local compatível com o mesmo contrato.

## 7 Dicionário de dados e validações

As regras valem no frontend e no backend. Espaços externos são removidos de campos textuais, exceto senha; textos vazios após normalização são inválidos. Rascunho pode ficar incompleto, mas respeita tamanho, tipo e formato dos valores informados. Valores monetários usam precisão decimal de duas casas, sem ponto flutuante binário como representação de negócio.

### 7 1 Conta e preferências

| Campo | Obrigatoriedade | Validação e apresentação |
|---|---|---|
| Nome da pessoa | Cadastro | 2 a 120 caracteres |
| E-mail | Cadastro | Até 254 caracteres, formato válido, único sem distinção de caixa; privado |
| Senha | Cadastro e redefinição | 12 a 128 caracteres; aceita colagem e gerenciador de senhas; confirmação só no formulário |
| Classe de conta | Cadastro | Empreendedor ou Profissional; modalidade profissional Investidor, Mentor ou Ambos |
| Maioridade | Cadastro | Confirmação declaratória de 18 anos ou mais, desmarcada inicialmente |
| Termos e política | Cadastro | Aceite dos termos e ciência da política com versão e data; não pré-selecionados |
| Uso de texto em IA | Opcional | Booleano inicialmente falso, finalidade apresentada e histórico de alteração |
| Fuso | Perfil/configurações | Identificador de fuso válido; padrão America/Fortaleza |

Troca de e-mail não integra esta versão; o campo aparece como somente leitura em Configurações. Alteração de nome segue revisão quando altera perfil publicado. Alteração de senha exige senha atual, nova senha e confirmação; invalida as demais sessões. Recuperação usa link de 30 minutos e invalida todas as sessões, exigindo novo login. Sessão dura no máximo 7 dias; ações sensíveis exigem autenticação recente de até 10 minutos.

### 7 2 Startup

| Campo | Obrigatoriedade na publicação | Validação e apresentação |
|---|---|---|
| Nome | Sim | 2 a 120 caracteres; não precisa ser exclusivo |
| Descrição | Sim | 50 a 2.000 caracteres; texto simples |
| Segmento principal | Sim | Uma opção do catálogo |
| Estágio | Sim | Ideação, MVP, Tração ou Escala |
| Cidade e UF | Sim | Cidade de 2 a 120 caracteres e UF brasileira válida |
| Necessidades | Sim | Ao menos uma: investimento ou áreas de mentoria |
| Valor pretendido | Se busca investimento | De R$ 1,00 a R$ 100.000.000,00; valor buscado para a oportunidade apresentada |
| Formato de mentoria | Se busca mentoria | Remoto, presencial ou ambos |
| CNPJ | Não | Até 18 caracteres com máscara; normalizar separadores; validar formato e dígitos conforme regra oficial vigente no momento da implementação; unicidade se informado |
| Website | Não | HTTPS, até 2.048 caracteres |
| Logotipo | Não | PNG, JPEG ou WebP; até 2 MB e 4.096 px em cada dimensão; imagem substituta se ausente |

CNPJ é tratado como texto e o algoritmo de validação deve ser versionado; validação sintática não prova existência da empresa. Não se exige CNPJ para uma startup em ideação. Não haverá consulta externa automática de cadastro empresarial nesta versão.

### 7 3 Investidor e mentor

| Campo | Quem preenche | Validação |
|---|---|---|
| Nome, biografia, cidade/UF | Todos | Nome 2–120; biografia 50–2.000 caracteres; localização conforme startup |
| Segmentos e estágios | Todos | Um ou mais valores dos catálogos; selecionar todos deve ser explícito |
| Tese de investimento | Investidor | 50 a 2.000 caracteres sobre negócios procurados |
| Aporte mínimo, médio e máximo | Investidor | De R$ 1,00 a R$ 100.000.000,00; mínimo menor ou igual ao médio e médio menor ou igual ao máximo |
| Abrangência | Investidor | Brasil ou uma ou mais UFs; não aceitar lista vazia |
| Especialidades | Mentor | Uma ou mais áreas do catálogo de mentoria |
| Descrição da atuação | Mentor | 50 a 2.000 caracteres, incluindo experiência e apoio oferecido |
| Disponibilidade mensal | Mentor | Inteiro de 1 a 160 horas; campo informativo, não reserva agenda |
| Formato | Mentor | Remoto, presencial ou ambos; atendimento remoto nacional, presencial na cidade informada |

Foto de profissional é opcional e segue os limites do logotipo. Não há verificação de patrimônio, experiência ou certificação automática. Dados publicados são autodeclarados e devem ser apresentados assim.

### 7 4 Catálogos fixos

Segmentos iniciais: Finanças, Educação, Saúde, Comércio e varejo, Agronegócio, Logística e mobilidade, Turismo, Energia e sustentabilidade, Economia criativa, Tecnologia e serviços digitais, Indústria e Outros. Uma startup seleciona um principal; profissionais selecionam vários. “Outros” é uma categoria, não um campo de taxonomia livre. SaaS e IA podem aparecer na descrição, sem misturar modelo de negócio com setor no mesmo catálogo.

Áreas de mentoria: Estratégia e modelo de negócio, Tecnologia e produto, Marketing e vendas, Gestão financeira, Captação e pitch, Operações e pessoas. A mesma lista atende necessidade da startup e especialidade do mentor. Catálogos são fornecidos pelo sistema e documentados; não existe editor administrativo de catálogos na versão 1.0.

Estágios: Ideação significa problema e solução em elaboração; MVP significa versão inicial testável; Tração significa uso e validação em crescimento; Escala significa expansão de operação validada. Essas descrições aparecem como ajuda no formulário, sem pedir comprovação automática.

### 7 5 Interações e conteúdo

| Campo | Limite | Regra adicional |
|---|---|---|
| Convite | 10 a 500 caracteres | Finalidade compatível e uma pendência por par |
| Mensagem | 1 a 2.000 caracteres | Texto simples não vazio; sem anexos |
| Assunto da reunião | 3 a 120 caracteres | Data futura ao propor/confirmar |
| Duração | 15, 30, 45, 60 ou 90 minutos | Comparar intervalos em UTC; exibir fuso |
| Local presencial | 5 a 300 caracteres | Obrigatório se presencial |
| Link remoto | HTTPS, até 2.048 caracteres | Obrigatório antes da confirmação |
| Cancelamento | 10 a 500 caracteres | Visível à contraparte |
| Pitch | Resumo 50–2.000; PDF até 10 MB | Link ou PDF obrigatório; pode conter ambos |
| Canvas | 20 a 3.000 por bloco | Nove blocos obrigatórios ao publicar |
| Avaliação | Nota inteira 1–5; comentário até 1.000 | Uma por autor e reunião concluída |
| Denúncia | Descrição 10–1.000 | Motivo padronizado e alvo acessível ao denunciante |
| Decisão administrativa | Motivo 10–1.000 | Obrigatório em rejeição, suspensão, ocultação e resolução |

Uploads validam extensão, tipo e assinatura do arquivo; arquivo inválido é recusado sem substituir a versão atual. PDFs protegidos por senha não são aceitos porque impedem análise administrativa. Conteúdo não é interpretado como HTML executável. Links externos abrem em nova aba identificada, mantendo o contexto de navegação.

## 8 Privacidade e ciclo de vida dos dados

Esta seção define a operação do produto acadêmico. A equipe de Governança é responsável pelos textos de termos, política, finalidade, fundamento do tratamento e canal de atendimento. Os prazos abaixo são decisões operacionais do projeto; não são apresentados como prazos legais. Publicação para usuários reais exige revisão dos textos e das condições dos provedores efetivamente escolhidos.

### 8 1 Visibilidade e pedidos

Nome profissional, apresentação da startup, localização em cidade/UF e informações de afinidade publicadas ficam no catálogo autenticado. E-mail, CNPJ, senha, sessões, preferências de consentimento e dados de suporte não são publicados. Pitch e Canvas usam o controle próprio. Denúncias e evidências são limitadas a quem as apresentou e à administração autorizada.

O titular corrige campos editáveis no perfil e pode abrir solicitação de acesso/exportação, correção assistida ou exclusão. Pedido tem protocolo, tipo, data, estado e resposta. Exportação entrega arquivo de dados próprios por acesso autenticado, incluindo mensagens do próprio autor e metadados de reuniões, sem fornecer dados privados da contraparte. Solicitação pode ser cancelada enquanto pendente, exceto exclusão já confirmada e em processamento.

Na exclusão, o usuário lê consequências e confirma com senha. A conta é desativada imediatamente, sessões são revogadas, perfil some da descoberta, convites e reuniões futuras são cancelados, conexões encerradas e Pro demonstrativo desativado. A interface encerra sessão e informa que o protocolo seguirá por e-mail. O administrador registra execução ou impedimento justificado e notifica o titular; a exclusão não se resume a ocultar um cadastro.

### 8 2 Retenção operacional

| Categoria | Regra da versão acadêmica |
|---|---|
| Perfil, materiais, imagens e vetores | Remover das bases ativas em até 7 dias corridos após confirmação de exclusão |
| Mensagens e avaliações do titular excluído | Substituir conteúdo e autoria visível por marcador de exclusão em até 7 dias; não apagar conteúdo escrito pela contraparte |
| Conexões, reuniões e métricas | Preservar estrutura mínima anonimizada para histórico da contraparte e contagem agregada; remover nome, links, local e textos identificadores do excluído |
| Protocolo e contato de resposta | Guardar até 30 dias após conclusão do pedido; depois remover endereço de resposta e texto identificador |
| Evidência de denúncia aberta | Acesso administrativo restrito até decisão, limitado a 90 dias; encerramento exige descarte ou anonimização da evidência no prazo |
| Auditoria administrativa | Conservar por 180 dias com identificador pseudonimizado, ação e motivo mínimo; sem senhas, tokens ou conteúdo de chat |
| Logs técnicos | Conservar por 30 dias, com acesso restrito e sem corpo de mensagens ou credenciais |
| Backups | Rotação de até 30 dias; impedir que restauração republique dados já excluídos, reaplicando registros mínimos de expurgo |

Dados de conta ativa são mantidos enquanto necessários aos fluxos descritos. A operação de exclusão abrange armazenamento de arquivos e dados derivados, não apenas banco principal. A equipe deve demonstrar o processo com dados sintéticos antes de coletar dados reais. Retenção excepcional para obrigação aplicável requer registro e atualização da política; não deve ser presumida pelo desenvolvedor.

### 8 3 Termos e finalidade opcional

Termos e política possuem versão, data de vigência e histórico acessível. Alteração de termos que exija novo aceite apresenta aviso no próximo login; até decidir, o usuário mantém acesso a políticas, configurações e pedidos de dados, mas não inicia novas interações. Recusa permite solicitar exclusão. Atualização meramente informativa de política gera ciência separada, sem fabricar consentimento retroativo.

O uso opcional de texto para IA é independente da assinatura. Desligar a opção não cancela Pro, mas a tela informa que a ordenação inteligente ficará indisponível e oferece “Gerenciar plano”. Dados não autorizados continuam elegíveis para compatibilidade básica por categorias. Não há envio de publicidade nem consentimento de marketing nesta versão.

## 9 Especificação das telas

As telas abaixo são responsabilidades de interface, não uma obrigação de criar 26 páginas independentes. Abas, modais e páginas podem compartilhar componentes, preservando ações, estados e acessibilidade. Todas usam a identidade visual definida pelo design e os mesmos nomes de botões. Rotas e disposição estética são decisões de implementação; permissões e resultados são definidos aqui.

### 9 1 Navegação por perfil

Empreendedor: Início, Explorar, Recomendações, Minha startup, Pitch e Canvas, Solicitações, Conversas, Reuniões, Avaliações e Favoritos. Profissional: Início, Explorar, Recomendações, Meu perfil, Solicitações, Conversas, Reuniões, Avaliações e Favoritos. Notificações, Configurações, Minha assinatura e Sair ficam no menu da conta.

Administrador: Moderação, Indicadores, Auditoria e Solicitações de dados. Não há ação “Entrar como usuário” ou contratação Pro administrativa. No mobile, a navegação pode ser recolhida; ações essenciais não devem depender de passar o mouse.

### T01 Apresentação

**Acesso:** Todos. **Referências:** RF07, RF11, RF15.

**Conteúdo e ações:** Explicação do Nexhub, “Criar conta”, “Entrar”, links de políticas.

**Comportamento:** Topo com marca, Entrar e Criar conta; apresentação para os três públicos; explicação do processo; planos; rodapé com políticas. “Começar como startup”, “Sou investidor” e “Sou mentor” apenas preselecionam o cadastro. Não afirmar quantidade de usuários ou resultados que não foram medidos.

**Estados:** Encaminha ao cadastro/login; não mostra informações privadas.

### T02 Cadastro

**Acesso:** Visitante. **Referências:** RF07, RF11.

**Conteúdo e ações:** Nome, e-mail, senha, confirmação, modalidade, termos; “Criar conta”, “Já tenho conta”.

**Comportamento:** Uma escolha de perfil seguida de dados de conta. Confirmação de senha e controles separados de termos, política e maioridade. “Mostrar senha” altera apenas a exibição. “Criar conta” fica em processamento durante envio. Sucesso encaminha à confirmação de e-mail e preenchimento do perfil; validação preserva os demais campos e nunca ecoa senha em mensagem de erro.

**Estados:** Valida campos, cria conta e abre preenchimento de perfil; mostra erros por campo e evita envio duplicado.

### T03 Login e recuperação

**Acesso:** Visitante. **Referências:** RF07.

**Conteúdo e ações:** E-mail/senha; “Entrar”, “Mostrar senha”, “Esqueci minha senha”.

**Comportamento:** Subtelas: login, pedido de recuperação, redefinição por link e confirmação de e-mail. Login inválido: “E-mail ou senha inválidos”. Recuperação sempre responde “Se houver uma conta com este e-mail, enviaremos as instruções”. Link expirado oferece novo envio. Conta suspensa exibe impedimento após autenticação válida, sem permitir navegação protegida.

**Estados:** Login abre painel ou conclusão do perfil; recuperação confirma pedido sem revelar existência da conta.

### T04 Minha startup

**Acesso:** Empreendedor. **Referências:** RF01, RF08.

**Conteúdo e ações:** Dados básicos, necessidades, prévia, estado de análise; “Salvar rascunho”, “Enviar para análise”, “Pausar perfil”.

**Comportamento:** Organizar em Identificação, Negócio e Necessidades. Mostrar progresso por campos obrigatórios, não percentual arbitrário. “Pré-visualizar” não publica. “Enviar para análise” exibe resumo do que será enviado. Se em análise, oferecer “Retirar da análise”. Para versão já aprovada, separar claramente “Publicado” e “Alterações em edição”. Pausa e reativação exigem confirmação do efeito.

**Estados:** Mostra campos pendentes e motivo de rejeição; “Reativar” aparece quando pausada.

### T05 Meu perfil profissional

**Acesso:** Investidor/mentor. **Referências:** RF02, RF08.

**Conteúdo e ações:** Modalidade, interesses, faixa de aporte, especialidades, disponibilidade; “Salvar”, “Pré-visualizar”, “Enviar para análise”, “Pausar”.

**Comportamento:** Separar Dados gerais, Investimento e Mentoria. A modalidade controla quais grupos aparecem. “Ambos” exibe os dois, sem esconder validações. Mostrar ticket mínimo, médio e máximo em campos distintos. Alteração de atuação informa impedimentos por vínculos existentes. Prévia apresenta exatamente os campos públicos, com e-mail fora da apresentação.

**Estados:** Campos condicionais à modalidade; informa efeito das alterações nas sugestões.

### T06 Painel inicial

**Acesso:** Autenticados. **Referências:** RF01, RF02, RF03, RF05, RF12.

**Conteúdo e ações:** Pendências do perfil, recomendações resumidas, convites e próximas reuniões; “Completar perfil”, “Ver recomendações”, “Abrir reunião”.

**Comportamento:** Empreendedor vê sua startup, pendências, profissionais recomendados e reuniões. Profissional vê pendências, startups e reuniões. Mostrar no máximo três recomendações resumidas com “Ver todas”. Administrador é direcionado à fila de moderação. Clique em card abre recurso; números representam dados reais da conta.

**Estados:** Cards levam à função correspondente; sem dados, orienta primeiro passo.

### T07 Explorar

**Acesso:** Autenticados. **Referências:** RF04, RF13.

**Conteúdo e ações:** Busca, filtros, ordenação, paginação; “Aplicar filtros”, “Limpar”, “Ver perfil”, “Favoritar”.

**Comportamento:** Busca por nome, filtros de segmento, estágio, UF/cidade e modalidade; investimento adiciona faixa; mentoria adiciona especialidade. Em mobile, filtros abrem painel com Aplicar e Limpar. Cards usam uma ação principal “Ver perfil” e favoritar secundário. Exibir total e paginação. Estado vazio: “Nenhum perfil encontrado com estes filtros” e “Limpar filtros”.

**Estados:** Carregamento, erro com nova tentativa e ausência de resultados; mantém filtros ao voltar do perfil.

### T08 Recomendações

**Acesso:** Autenticados. **Referências:** RF03, RF15.

**Conteúdo e ações:** Cards ordenados, razões de afinidade, aviso de dados incompletos/IA indisponível; “Ver perfil”, “Conectar”, “Não tenho interesse”, “Ver ocultados”.

**Comportamento:** Separar abas Investimento e Mentoria para empreendedor e profissional Ambos. Perfil dedicado usa sua modalidade. Card mostra compatibilidade e até três motivos. Pro habilitado indica “Análise inteligente”; Gratuito indica “Por critérios” e oferta discreta de Pro. Não exibir selo de IA em resultado de fallback. Sugestões ocultadas têm lista própria e botão Restaurar.

**Estados:** Ocultar não denuncia nem bloqueia; lista ocultada permite “Restaurar”.

### T09 Perfil de startup

**Acesso:** Autenticados autorizados. **Referências:** RF01, RF04, RF05, RF06, RF14.

**Conteúdo e ações:** Apresentação, segmento, estágio, necessidades, Pitch/Canvas; “Conectar”, “Ver pitch”, “Ver Canvas”, “Denunciar”.

**Comportamento:** Cabeçalho com logotipo, nome, cidade/UF, segmento e estágio; corpo com descrição, necessidades e materiais. Estados do botão: Conectar, Solicitação enviada, Responder convite e Abrir conversa. Perfil próprio mostra Editar. Material restrito apresenta cadeado e condição de acesso. Conteúdo indisponível por restrição recebe mensagem neutra, sem revelar bloqueio.

**Estados:** Proprietário vê “Editar”; material restrito explica condição de acesso; convite pendente muda o botão.

### T10 Perfil de investidor e mentor

**Acesso:** Autenticados autorizados. **Referências:** RF02, RF04, RF05, RF14.

**Conteúdo e ações:** Biografia, interesses, faixa/especialidades, disponibilidade; “Conectar”, “Denunciar”, “Favoritar”.

**Comportamento:** Cabeçalho com nome, modalidade e localização; biografia; segmentos/estágios; bloco de investimento e/ou mentoria. Interesses publicados são visíveis; consentimentos e e-mail não. Usar os mesmos estados do botão de conexão da startup. Disponibilidade significa horas mensais declaradas, não agenda livre.

**Estados:** Esconde dados privados; não promete disponibilidade de agenda com base apenas em horas/mês.

### T11 Solicitações

**Acesso:** Autenticados. **Referências:** RF05.

**Conteúdo e ações:** Abas recebidas/enviadas, finalidade, mensagem e estado; “Aceitar”, “Recusar”, “Cancelar”, “Ver perfil”.

**Comportamento:** Abas Recebidas e Enviadas, filtro por estado e indicação de prazo de expiração. Modal de convite tem finalidade, mensagem, contador e “Enviar solicitação”. Aceitar e recusar atualizam card e contador. Cancelar pede confirmação. Clique repetido ou convite alterado em outra sessão apresenta estado atualizado, sem repetir operação.

**Estados:** Aceite abre conversa; ações deixam de funcionar após mudança de estado por outra sessão.

### T12 Conversas

**Acesso:** Participantes. **Referências:** RF05, RF14.

**Conteúdo e ações:** Lista, contador, histórico, campo de texto; “Enviar”, “Tentar novamente”, “Agendar reunião”, “Encerrar conexão”, “Bloquear”, “Denunciar mensagem”.

**Comportamento:** Desktop usa lista de conversas à esquerda e histórico à direita; mobile usa lista e detalhe com Voltar. Campo de texto, contador, botão Enviar e acesso à reunião. Menu por mensagem contém Denunciar; menu da conversa contém Encerrar conexão e Bloquear. Marcador de falha permite tentar novamente. Enter envia e Shift+Enter quebra linha; botão continua disponível para acessibilidade.

**Estados:** Envio vazio desabilitado; falha preserva texto; conexão encerrada mostra histórico sem novo envio.

### T13 Reuniões

**Acesso:** Participantes. **Referências:** RF05, RF10.

**Conteúdo e ações:** Lista/calendário e formulário; “Propor reunião”, “Confirmar”, “Recusar”, “Propor novo horário”, “Cancelar”, “Abrir link”, “Marcar concluída”, “Registrar ausência” pelo organizador.

**Comportamento:** Lista por futuras e passadas com filtros por estado; calendário é apenas outra apresentação dos mesmos registros, sem obrigação de arrastar eventos. Formulário mostra fuso ao lado de data/hora. Detalhe compara horário atual e contraproposto. “Abrir link” fica disponível somente aos participantes enquanto o registro permitir. Após conclusão, “Avaliar interação” leva à T15.

**Estados:** Botões dependem de estado e horário; conflito explica necessidade de outra opção.

### T14 Pitch e Canvas

**Acesso:** Responsável da startup. **Referências:** RF06, RF08.

**Conteúdo e ações:** Editor dos nove blocos, upload/link, visibilidade; “Salvar rascunho”, “Pré-visualizar”, “Enviar para análise”, “Substituir arquivo”, “Remover”.

**Comportamento:** Abas Pitch e Canvas, cada uma com estado e controle de visibilidade. Pitch aceita upload e link, com prévia de nome/tamanho do arquivo. Canvas usa nove campos com orientações: clientes, valor, canais, relacionamento, receita, recursos, atividades, parcerias e custos. “Retirar de publicação” é separado de “Remover arquivo”. Confirmar perda de acesso ao retirar material.

**Estados:** Upload mostra progresso/erro; remoção confirma efeito; rejeição conserva versão aprovada.

### T15 Avaliações

**Acesso:** Participantes elegíveis. **Referências:** RF10.

**Conteúdo e ações:** Reunião, destinatário, estrelas, comentário; “Enviar avaliação”, “Ver recebidas”, “Denunciar”.

**Comportamento:** Abas Pendentes, Enviadas e Recebidas. Mostrar reunião e contraparte antes de avaliar. Cada estrela tem rótulo textual de 1 a 5. “Enviar avaliação” fica ativo com nota válida e não permite envio duplo. Após envio, mostrar comprovante de registro e conteúdo. Não apresentar média pública ou classificação de melhores profissionais.

**Estados:** Enviar exige nota; avaliação já enviada não duplica; não elegível recebe explicação.

### T16 Notificações

**Acesso:** Autenticados. **Referências:** RF12.

**Conteúdo e ações:** Eventos com data e estado; “Abrir”, “Marcar como lida”, “Marcar todas como lidas”.

**Comportamento:** Central ordenada da mais recente para a mais antiga; filtro Todas/Não lidas. Ícone de sino no menu abre resumo e “Ver todas”. Ao abrir recurso inacessível, mostrar “Este conteúdo não está mais disponível”. Marcar como lida não significa aceitar convite nem confirmar reunião. Notificações de mensagem não incluem o corpo do chat fora da conversa.

**Estados:** Atualiza contador sem alterar notificações de outros usuários.

### T17 Configurações

**Acesso:** Titular. **Referências:** RF07, RF11, RF14, RF15.

**Conteúdo e ações:** Conta, preferências opcionais, políticas, pedidos de dados; “Salvar”, “Alterar senha”, “Solicitar exclusão”, “Sair”.

**Comportamento:** Abas Conta, Privacidade, Segurança e Dados. Conta mostra e-mail somente leitura; Segurança altera senha; Privacidade gerencia IA e termos; Dados cria e acompanha pedidos. Links para Minha assinatura e Bloqueados. Exclusão abre confirmação com efeitos e senha; após confirmar, encerra sessão e informa envio por e-mail. Sair encerra a sessão atual.

**Estados:** Ações sensíveis exigem confirmação; pedidos mostram protocolo/estado.

### T18 Moderação

**Acesso:** Administrador. **Referências:** RF08.

**Conteúdo e ações:** Fila, filtros, detalhe e denúncias; “Aprovar”, “Rejeitar”, “Suspender”, “Reativar”, “Ocultar conteúdo”, “Concluir denúncia”.

**Comportamento:** Abas Perfis, Materiais, Denúncias e Contas. Lista mostra alvo, autor, data e estado. Detalhe da revisão mostra versão atual e submetida; Aprovar/Rejeitar age sobre a versão exibida. Suspender exige motivo e resumo dos efeitos. Denúncia mostra somente evidência anexada pelo sistema; resolução oferece Manter conteúdo, Ocultar conteúdo ou Suspender conta, com motivo.

**Estados:** Motivo obrigatório quando cabível; decisão audita e notifica responsável.

### T19 Indicadores

**Acesso:** Administrador. **Referências:** RF09.

**Conteúdo e ações:** Matches, conversas, reuniões; período e fuso; “Aplicar período”, “Limpar filtros”.

**Comportamento:** Cards para matches, conversas iniciadas, reuniões confirmadas, canceladas e concluídas; contadores atuais de perfis separados dos eventos por período. Gráfico simples pode acompanhar os dados, sempre com alternativa textual. Se API falhar, mostrar erro e Tentar novamente; zero apenas quando consulta bem-sucedida não encontrou eventos.

**Estados:** Explica cada indicador; sem eventos mostra zero, falha não é apresentada como zero.

### T20 Auditoria

**Acesso:** Administrador autorizado. **Referências:** RF08, RNF10.

**Conteúdo e ações:** Autor, ação, recurso, motivo e data; filtros e “Ver detalhe”.

**Comportamento:** Filtros por autor administrativo, tipo de ação, alvo e período. “Ver detalhe” mostra motivo e metadados mínimos, sem credenciais. Não existem Editar, Excluir log ou ação em lote que apague evidência. Acesso de leitura também é restrito; dados sensíveis não entram na busca livre.

**Estados:** Somente leitura, paginação; não registra senhas, tokens ou conteúdo privado desnecessário.

### T21 Planos

**Acesso:** Visitantes e contas elegíveis. **Referências:** RF15.

**Conteúdo e ações:** Comparação Gratuito/Pro, aviso de simulação; “Usar Gratuito”, “Simular contratação”.

**Comportamento:** Comparação de recursos entre Gratuito e Pro, com R$ 49,90/mês identificado como ilustrativo. Explicar benefício semântico e dependência da autorização de uso dos textos. Botão de plano atual não inicia contratação duplicada. Visitante segue ao cadastro com retorno ao plano escolhido; a conta nasce Gratuita até concluir a simulação.

**Estados:** Visitante é levado ao cadastro; usuário autenticado segue para resumo; plano atual é identificado.

### T22 Contratação demonstrativa

**Acesso:** Conta autenticada elegível. **Referências:** RF15.

**Conteúdo e ações:** Resumo e aviso de ausência de cobrança; “Simular aprovação”, “Simular recusa”, “Voltar”.

**Comportamento:** Resumo do Pro, conta autenticada, preço ilustrativo e aviso “Demonstração: nenhum valor será cobrado”. Mostrar controles Simular aprovação, Simular recusa e Voltar. Não solicitar cartão nem Pix. Resultado aprovado leva à T23; recusado mantém o plano e oferece Tentar novamente. Falha de rede orienta conferir estado antes de reenviar.

**Estados:** Aprovação ativa Pro uma vez; recusa mantém plano; não coleta meios de pagamento reais.

### T23 Minha assinatura

**Acesso:** Titular. **Referências:** RF15.

**Conteúdo e ações:** Plano atual, recursos e histórico; “Ver planos”, “Voltar ao Gratuito”.

**Comportamento:** Mostrar plano atual, data de ativação, benefício, situação demonstrativa e histórico de operações. “Voltar ao Gratuito” confirma perda da ordenação IA e preservação de dados. Não exibir vencimento, fatura ou renovação automática fictícios. Se já Gratuito, oferecer “Conhecer Pro”.

**Estados:** Confirma downgrade, informa perda de benefícios futuros e preserva registros existentes.

### T24 Favoritos

**Acesso:** empreendedor e profissional. **Referência:** RF13.

Lista pessoal paginada, com card de perfil, “Ver perfil” e “Remover dos favoritos”. Favoritar não gera convite nem notificação à contraparte. Estado vazio oferece “Explorar perfis”. Se o perfil ficou indisponível, apresentar “Perfil indisponível” sem dados anteriores; permitir remover. Um mesmo perfil aparece uma vez.

### T25 Bloqueados e denúncias enviadas

**Acesso:** titular. **Referências:** RF08 e RF14.

Área de Configurações com duas abas. Bloqueados mostra identificação mínima necessária e “Desbloquear”; confirmação esclarece que a conexão não volta automaticamente. Denúncias mostra protocolo, tipo de alvo, data, estado e resultado resumido. Não expõe autor de outras denúncias nem motivo de bloqueio recebido. Usuário excluído aparece sem nome anterior.

### T26 Solicitações de dados

**Acesso:** administrador. **Referência:** RF11.

Fila de solicitações de acesso, correção e exclusão com data, prazo operacional, estado e identificador do titular. “Iniciar atendimento” atribui responsabilidade; “Registrar resposta” e “Concluir” exigem evidência mínima da ação. Exportação é entregue por recurso protegido, nunca por URL pública permanente. Exclusão mostra checklist de banco, arquivos, vetores, registros compartilhados e expurgo em backups. A interface não oferece conclusão sem registrar o resultado.

## 10 Padrões de interação para o design

### 10 1 Formulários e mensagens

Todo campo tem rótulo permanente; placeholder não substitui o rótulo. Campos condicionais informam por que apareceram. Campos obrigatórios são identificados e erros aparecem perto do campo e em resumo acessível no envio. Formatação de moeda, data e CNPJ não altera silenciosamente o valor. Senha aceita colar e usar gerenciador. Formulário longo oferece agrupamento e progresso real por campos.

Botão primário corresponde à ação principal da tela. Durante envio, muda para texto como “Salvando” e impede submissões repetidas. A proteção no servidor continua obrigatória. Operação destrutiva ou que afeta outra pessoa exige confirmação com efeito concreto. Cancelar fecha o diálogo sem aplicar mudança. Fechar tela com rascunho não salvo apresenta escolha entre continuar editando e descartar alterações.

Mensagens padrão: “Alterações salvas”; “Perfil enviado para análise”; “Não foi possível salvar. Tente novamente”; “Sua sessão expirou. Entre novamente”; “Você não tem permissão para esta ação”; “Este conteúdo não está disponível”; “Limite temporário atingido. Tente novamente em X minutos”. Não exibir detalhes internos, consultas, tokens ou rastreamento técnico.

### 10 2 Estados obrigatórios

Toda listagem deve ter carregamento, sucesso com itens, sucesso vazio e falha com nova tentativa. Toda ação deve ter disponível, indisponível com motivo, em andamento, sucesso e falha quando aplicável. Toda tela privada deve tratar sessão expirada e falta de permissão. Estado vazio orienta o próximo passo; não se preenche com registros fictícios que pareçam reais.

Cor nunca é o único indicador de estado. Usar texto e, quando útil, ícone. Foco deve ser visível; diálogos recebem foco, permitem fechar pelo teclado e devolvem foco ao botão que abriu. Contraste mínimo de projeto: 4,5:1 em texto normal e 3:1 em texto grande e controles. Alvos de toque principais devem ter pelo menos 44 por 44 px. Layout deve funcionar a partir de 360 px de largura.

### 10 3 Notificações e eventos

| Evento | Destinatário | Ação ao abrir |
|---|---|---|
| Convite recebido | Destinatário do convite | Detalhe em Solicitações |
| Convite aceito/recusado/expirado | Remetente | Conversa se aceito; histórico de solicitações nos demais |
| Nova mensagem | Contraparte | Conversa, sem corpo da mensagem na central |
| Reunião proposta, alterada ou cancelada | Outro participante | Detalhe da reunião |
| Reunião concluída | Participantes | Avaliar interação |
| Perfil/material aprovado ou rejeitado | Responsável | Editor com estado e motivo |
| Denúncia resolvida | Denunciante e afetado quando houver ação | Protocolo ou conteúdo moderado |
| Plano alterado | Titular | Minha assinatura |
| Pedido de dados atualizado | Titular | Protocolo; por e-mail após exclusão |

E-mail transacional é obrigatório para confirmação, recuperação, suspensão e acompanhamento de exclusão. Os demais eventos usam a central interna. Falha de e-mail não desfaz uma ação já concluída: registra pendência e permite reenvio controlado. Não há notificações push, SMS ou lembretes de reunião nesta versão.

## 11 Requisitos não funcionais e aceite técnico

Os RNFs preservam a numeração do professor. As metas abaixo são critérios de aceite escolhidos para o projeto, não resultados já alcançados. A equipe registra ambiente, volume, duração e evidências ao testá-los.

### RNF01 Disponibilidade

A aplicação publicada deve atender continuamente, com monitoramento de saúde e objetivo de disponibilidade mensal de 99%, incluindo indisponibilidade observada. Ambiente de demonstração deve permanecer acessível durante o período de avaliação. Registrar incidentes e tempo de recuperação. Backup diário, perda máxima visada de 24 horas e restauração em até 4 horas; demonstrar pelo menos uma restauração de teste.

### RNF02 Segurança dos dados

HTTPS é obrigatório no ambiente publicado; banco, arquivos restritos e backups precisam de criptografia em repouso demonstrável pela configuração do serviço. Senhas usam hash de senha adequado, nunca texto puro ou criptografia reversível. Segredos ficam fora do repositório e dos logs. Upload e acesso a arquivos verificam tipo e permissão. Operações de sessão e autorização são verificadas no servidor, incluindo suspensão, bloqueio e plano.

Limitar login a 5 falhas por conta em 15 minutos, com proteção adicional por origem que não permita bloquear todos os usuários de uma rede compartilhada. Recuperação segue limites de reenvio. Sessões devem ser revogáveis; cookies, se usados, adotam proteção apropriada e as operações contra falsificação de requisição devem ser protegidas. A escolha concreta do mecanismo de sessão é documentada na arquitetura.

### RNF03 Privacidade

Aplicar matriz de visibilidade, finalidade de IA, termos versionados e pedidos da seção 8. Demonstrar correção, revogação de IA e exclusão com dados sintéticos. Evidenciar remoção de arquivo e vetor, além de desativação da conta. A equipe de Governança valida a política antes do piloto real, registrando responsabilidades e fornecedores.

### RNF04 Usabilidade

Executar testes com pelo menos 5 participantes externos ao desenvolvimento, cobrindo cadastro, descoberta, convite e agendamento. Meta: ao menos 80% das tentativas dessas tarefas concluídas sem intervenção do facilitador. Registrar erros, tempo, comentários e correções. Interface usa linguagem compreensível a empreendedores e investidores, sem nomes de tabelas ou detalhes de API.

### RNF05 Desempenho e crescimento

Listagens, detalhe e operações comuns devem responder em até 2 segundos no percentil 95, excluindo upload e serviço de IA, sob ensaio de 50 usuários simultâneos por 10 minutos com 1.000 perfis e 10.000 mensagens sintéticas. Taxa de erro inesperado inferior a 1%. Paginação obrigatória; não carregar todo histórico de chat nem todos os perfis de uma vez. Persistência não depende da memória de uma instância. Mensagens novas aparecem em até 5 segundos; IA tem fallback após 10 segundos.

### RNF06 Governança e arquitetura

Registrar arquitetura, dependências externas, responsabilidades, processo de acesso administrativo, política de backups, tratamento de incidentes e controle de alterações. Guardar decisões de arquitetura com motivo e impacto. Padrões adicionais formalmente recebidos da disciplina devem ser incorporados por revisão controlada da especificação, preservando rastreabilidade.

### RNF07 Verificação e validação

Cobrir casos positivos e negativos de autenticação, propriedade de recurso, mudança de estado, duplicidade, arquivos restritos, mensagens, agenda, planos e dados pessoais. Nenhum fluxo crítico pode depender apenas de esconder botão. Usar testes automatizados nas regras críticas e roteiro manual integrado com o frontend. Beta testers devem usar ambiente separado, sem credenciais de produção.

### RNF08 Responsividade e acessibilidade

Validar em 360, 768 e 1.440 px, com navegação por teclado, foco visível, rótulos e mensagens compreensíveis. Testar versões disponíveis de Chrome e Edge no desktop e navegador móvel na data do ensaio; registrar as versões efetivas. Não deve existir rolagem horizontal global; tabelas administrativas podem ter região própria rolável e identificada.

### RNF09 Manutenibilidade e integração

Frontend e backend desacoplados, API documentada, configuração por ambiente, instruções de execução reproduzíveis e organização modular. Contratos definem campos, enumerações, paginação, erros e permissões. Não retornar modelos de banco indiscriminadamente. Datas transmitidas em formato inequívoco com fuso e identificadores não previsíveis como contrato de recurso, sem tratá-los como substitutos de autorização.

### RNF10 Auditoria

Registrar administrador, ação, alvo, data/hora, motivo e resultado das decisões. A trilha é somente leitura na interface e o backend não disponibiliza alteração/exclusão ordinária de eventos. Remoção por política de retenção é procedimento controlado e registrável. Não registrar senha, token, arquivo inteiro ou corpo de chat. Administrador não aprova revisão própria; contas administrativas não possuem perfil de participante.

## 12 Cenários de aceite integrados

Os cenários são roteiro mínimo de validação, além dos aceites de cada RF. “Dado” prepara o estado; “Quando” identifica a ação; “Então” define o resultado observável. Cada execução deve registrar responsável, data, ambiente, evidência e resultado.

| Código | Preparação e ação | Resultado esperado | Referências |
|---|---|---|---|
| CA01 | Criar conta válida e confirmar link | Conta Gratuita confirmada; perfil ainda não publicado | RF07, RF11, RF15 |
| CA02 | Reutilizar link ou enviar cadastro inválido | Erro claro, sem conta duplicada ou exposição de senha | RF07 |
| CA03 | Empreendedor salva perfil incompleto e tenta publicar | Rascunho salvo; publicação bloqueada com campos faltantes | RF01 |
| CA04 | Mentor publica sem ticket; investidor sem ticket médio | Mentor aceito se demais campos válidos; investidor impedido | RF02 |
| CA05 | Administrador rejeita e usuário reenvia correção | Motivo visível, nova revisão e auditoria preservadas | RF08 |
| CA06 | Editar perfil aprovado e aguardar revisão | Versão anterior continua pública; rascunho não vaza | RF01, RF02, RF08 |
| CA07 | Usuário tenta editar startup de outra conta | Operação recusada no servidor, sem alterar recurso | RF07 |
| CA08 | Buscar e combinar filtros sem resultados | Estado vazio com Limpar filtros; nenhuma informação restrita | RF04 |
| CA09 | Recomendar perfis com dados controlados | Pontuação conforme fórmula e exclusão de inelegíveis | RF03 |
| CA10 | Pro habilitado compara pares semânticos | Ordenação usa IA, razões verdadeiras e meta da base de 30 pares | RF03, RF15 |
| CA11 | Revogar IA, suspender candidato ou falhar serviço | Revogação/bloqueio respeitados; fallback identificado quando cabível | RF03, RF11 |
| CA12 | Enviar convites cruzados ou aceitar duas vezes | Uma solicitação válida, uma conexão e uma conversa | RF05 |
| CA13 | Recusar convite e tentar reenviar imediatamente | Prazo de 7 dias respeitado para remetente | RF05 |
| CA14 | Enviar mensagem e repetir após falha de rede | Uma mensagem persistida, sem duplicação; terceiro sem acesso | RF05, RF07 |
| CA15 | Confirmar reuniões sobrepostas simultaneamente | Só uma confirmação compatível; outra informa conflito | RF05 |
| CA16 | Propor reagendamento e recusar revisão | Horário original permanece reservado | RF05 |
| CA17 | Concluir reunião e avaliar duas vezes | Uma avaliação por autor; ausência/cancelamento não habilitam | RF10 |
| CA18 | Copiar URL de PDF restrito para outra conta | Acesso recusado; conexão autorizada consegue visualizar | RF06, RF07 |
| CA19 | Bloquear durante conversa com reunião futura | Envio impedido, vínculos futuros cancelados, histórico preservado | RF14 |
| CA20 | Denunciar uma mensagem e abrir administração | Só evidência pertinente visível; decisão exige motivo e audita | RF08 |
| CA21 | Simular contratação aprovada, recusada e repetida | Plano muda apenas na aprovada e uma vez; não coleta pagamento real | RF15 |
| CA22 | Voltar ao Gratuito e forçar benefício Pro pela API | Histórico preservado e benefício recusado pelo servidor | RF15 |
| CA23 | Reagendar, cancelar e reconectar um mesmo par | Métricas não duplicam primeiros eventos; cancelamento separado | RF09 |
| CA24 | Favoritar duas vezes e abrir perfil indisponível | Uma entrada pessoal; indisponibilidade sem vazamento de dados | RF13 |
| CA25 | Abrir notificação de recurso com permissão revogada | Mensagem neutra de indisponibilidade, contador atualizado | RF12 |
| CA26 | Solicitar exclusão e executar expurgo | Sessão revogada, protocolo por e-mail e remoção/anonimização evidenciada | RF11, RNF03 |
| CA27 | Acessar administração sem papel ou elevar papel no cadastro | Acesso negado; não há autopromoção | RF07, RNF10 |
| CA28 | Usar fluxos em mobile e só com teclado | Ações acessíveis, foco correto e ausência de cortes | RNF04, RNF08 |
| CA29 | Executar carga e restauração documentadas | Metas medidas; limitações registradas, sem perda silenciosa | RNF01, RNF05 |

## 13 Modelo conceitual para a equipe

Esta seção explica os dados de negócio, sem impor nomes de tabelas ou uma implementação antecipada. A modelagem técnica deve preservar estas relações.

| Conceito | Responsabilidade e relação |
|---|---|
| Conta | Identidade, credenciais, classe, estado e sessões; possui um perfil de participante ou papel administrativo |
| Startup | Pertence a uma conta empreendedora; possui perfil versionado, necessidades, Pitch e Canvas |
| Perfil profissional | Pertence a uma conta profissional; reúne modalidade, interesses, investimento e/ou mentoria |
| Revisão | Liga uma versão de perfil/material à decisão administrativa e ao motivo |
| Conexão | Relaciona uma startup a um profissional; tem convites históricos e um canal permanente |
| Mensagem | Pertence à conversa e a seu autor; possui identificador de envio para impedir duplicidade |
| Reunião | Pertence à conexão; tem participantes, organizador, revisões de horário e estado |
| Avaliação | Liga autor, destinatário e reunião concluída; única por autor/reunião |
| Favorito e ocultação | Preferências pessoais de descoberta; não criam vínculo de contato |
| Bloqueio | Restrição direcional cuja existência em qualquer lado impede interação do par |
| Denúncia | Protocolo com alvo, evidência mínima, denunciante, decisão e auditoria |
| Plano e assinatura | Benefício vinculado à conta; histórico de operações demonstrativas |
| Termo, aceite e preferência | Versões dos documentos e registro das decisões de uso de dados |
| Pedido de dados | Tipo, titular, estado, prazo e resposta; orienta exportação/correção/exclusão |
| Notificação | Evento direcionado a um destinatário, com leitura individual |
| Auditoria e evento de métrica | Evidência administrativa e fatos de negócio contados sem duplicação |

Uma startup não deve ser confundida com uma credencial de login. Uma conexão não é a recomendação calculada. Um plano não é papel de acesso. Essas separações evitam alterações desnecessárias quando o produto crescer.

## 14 Rastreabilidade e calendário

O calendário abaixo reproduz as etapas fornecidas pelo professor. Não indica que uma entrega já foi concluída. As funcionalidades adicionais são incorporadas às etapas relacionadas e devem estar integradas antes do ensaio de 23/11/2026.

| Data | Referência acadêmica | Entrega e cobertura no Nexhub |
|---|---|---|
| 12/09/2026 | Arquitetura e ambiente | Repositório, stack e responsabilidades |
| 14/09/2026 | RF01, RF02 | Cadastro de startups e profissionais; T02, T04 e T05 |
| 21/09/2026 | RF07 | Autenticação, propriedade, papéis e sessão; T03 e T17 |
| 28/09/2026 | RF03 | Matchmaking, critérios e explicações; T08; preparar benefício Pro demonstrativo |
| 03/10/2026 | RF04 | Descoberta e detalhes; T07, T09 e T10; favoritos T24 |
| 05/10/2026 | RF05 | Solicitações, chat e reuniões; T11 a T13; notificações e bloqueios |
| 24/10/2026 | RF06 | Pitch e Canvas, T14, arquivos protegidos |
| 26/10/2026 | RF11, RNF03 | Termos, preferências e pedidos de dados; T17 e T26 |
| 07/11/2026 | RNF02 | Evidências de proteção em trânsito e repouso |
| 09/11/2026 | RF08, RF09 | Moderação, indicadores, denúncias e auditoria; T18 a T20 |
| 16/11/2026 | RF10 | Avaliações pós-reunião; T15 |
| 23/11/2026 | RNF07 e ensaio | Beta testers, planos T21–T23 integrados, plano de negócios e governança consolidados |
| 28/11/2026 | RNF01, RNF04, RNF05 | Disponibilidade, usabilidade e crescimento; medir desempenho |
| 30/11 a 03/12/2026 | RNF08, RNF09, RNF06, RNF10 | Projetaí, documentação, responsividade e auditoria |
| 07/12/2026 | Recuperação | Consolidação geral |
| 14/12/2026 | Final | Consolidação geral |

Moderação está prevista como entrega posterior, mas os estados de publicação e as permissões precisam existir desde os cadastros. Usar dados previamente aprovados no ambiente de desenvolvimento não elimina o requisito de aprovação. Da mesma forma, segurança e consentimentos necessários acompanham os primeiros fluxos, mesmo quando sua demonstração formal ocorre depois.

## 15 Responsabilidades e definição de pronto

Design entrega navegação, componentes, telas por perfil, comportamento responsivo e todos os estados descritos. Frontend implementa esses contratos e trata falhas sem ampliar permissões. Backend implementa dados, validações, autorização, concorrência, eventos e documentação da API. A equipe de documentação mantém visão do produto, diagramas, manual e rastreabilidade. Governança mantém políticas e operação. Verificação e Validação mantém cenários, evidências e beta testers. A liderança coordena dependências e mudanças de escopo.

Uma funcionalidade está pronta quando seus dados persistem, validações e permissões são aplicadas no servidor, a tela cobre sucesso e falha, os cenários de aceite relevantes passam e a documentação reflete o comportamento entregue. Uma rota isolada ou protótipo clicável não comprova conclusão do fluxo integrado.

O plano de negócios deve apresentar problema, público, proposta de valor, alternativas existentes, modelo Gratuito/Pro, hipótese de preço, custos de hospedagem/IA, aquisição de usuários e estratégia de lançamento. O preço demonstrativo não substitui validação comercial. Governança deve entregar matriz de responsabilidades, políticas, inventário de dados, processo de incidentes e evidências de controles. A documentação de testes deve relacionar cada evidência ao RF/RNF correspondente.

### 15 1 Controle de alterações

Versão 1.0, de 23/09/2026: consolida o escopo funcional, inclui favoritos e bloqueios, fixa planos demonstrativos, define uso de IA, resolve estados de interação e estabelece critérios de aceite. Alterações futuras registram código afetado, comportamento anterior, novo comportamento, motivo, impacto em design/dados/testes, responsável e versão. Não modificar silenciosamente a regra em uma tela ou endpoint.

### 15 2 Entrega integrada

A demonstração deve conter contas sintéticas de empreendedor, investidor, mentor, profissional Ambos e administrador; pelo menos uma conta Pro; perfis aprovados e rejeitados; uma conexão, conversa, reunião concluída, avaliação, denúncia e operação de plano. Deve demonstrar também um acesso negado, uma falha de IA com fallback e uma exclusão de conta sintética. Nenhuma credencial real deve aparecer na documentação compartilhada.

## 16 Glossário

| Termo | Significado no Nexhub |
|---|---|
| SaaS | Software oferecido como serviço acessado pela internet |
| Matchmaking | Processo de encontrar perfis compatíveis |
| Recomendação | Sugestão calculada; não autoriza contato por si só |
| Convite | Solicitação pendente de conexão |
| Match ou conexão | Vínculo aceito entre startup e profissional |
| Pitch | Apresentação resumida da startup e de sua oportunidade |
| Canvas | Modelo de negócio organizado em nove blocos |
| Ticket médio | Valor típico de aporte declarado pelo investidor |
| IA semântica | Comparação do significado dos textos para aprimorar afinidade |
| Critério de aceite | Resultado observável usado para verificar um requisito |
| Auditoria | Histórico de ações administrativas e seus responsáveis |
| Fallback | Comportamento alternativo quando um componente falha |
| Pro demonstrativo | Plano pago simulado, sem movimentação de dinheiro |
