# Correção visual do dark mode e painel meteorológico

O tema agora usa tokens semânticos para página, superfícies, texto, bordas, accent e sombra. Claro, escuro e automático compartilham a mesma estrutura de componentes; o modo escuro redefine as superfícies e o texto em azul-marinho, evitando a combinação de texto claro sobre fundo claro.

O painel meteorológico permanece na coluna direita, mas seu conteúdo segue um fluxo vertical: cabeçalho de localização, ilustração, temperatura e descrição, depois métricas em duas colunas. A ilustração permanece como camada decorativa com `pointer-events: none`; os blocos de conteúdo não dependem de posicionamento absoluto.

A classe `phase-one-static` continua ativa no protótipo para que a correção visual seja avaliada sem movimento excessivo. A previsão resumida, previsão completa, histórico e detalhes por horário não foram removidos.
