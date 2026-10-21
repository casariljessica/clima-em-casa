# Aditivo da especificação — Fase 1

Este documento complementa `REDESIGN_UI_UX.md` antes da implementação.

## Painel meteorológico vertical

No desktop, o painel direito deve ser independente no Grid, ter 320–380 px de largura, altura mínima de 540 px e padding de 28–32 px. A ordem visual é: localização no topo; ilustração estática de 180–240 px; temperatura de 72–96 px; condição e sensação; métricas em cartões/linhas com gap de 8–12 px. Em mobile, a ilustração fica entre 150–180 px e as métricas usam duas colunas quando houver espaço.

## Ilustrações estáticas

Antes das animações completas, criar SVGs compostos por camadas: sol com gradiente radial, halo e raios; parcial com sol e duas nuvens volumétricas; nublado com três nuvens azul-cinza; chuva com duas camadas de gotas; tempestade com nuvem escura e relâmpago sem flash; neve com três tamanhos de flocos; neblina com faixas translúcidas; noite com lua, poucas estrelas e nuvens dessaturadas. Usar `viewBox`, `defs`, grupos identificáveis e `aria-hidden="true"`; a descrição textual permanece no HTML.

## Fundo e protótipo

O fundo meteorológico fica atrás do conteúdo, usa `pointer-events: none`, não possui padrão de pontos e tem opacidade inferior à dos cartões. Na Fase 1, as ilustrações e o fundo são estáticos; os keyframes entram apenas após aprovação visual. O protótipo já deve manter pesquisa, painel vertical, previsão resumida e completa, histórico e detalhes horários funcionando.

## Interação nativa

Priorizar `button`, `a`, `form`, `label`, `select` e `dialog`. Cartões não nativos precisam de `tabindex="0"`, `role="button"`, foco visível e Enter/Espaço. Os links devem apontar para seções reais.

## Comparação visual

Validar contra a referência: sidebar independente; área central clara; painel vertical à direita; ilustração grande como foco; cartões resumidos antes do painel; ausência do painel azul horizontal antigo; ausência do padrão de pontos; espaçamento e proporções semelhantes. Capturar 1440×900, 768×1024 e 390×844 nos temas claro e escuro quando houver navegador.

## Dark mode

Usar os tokens `--page-bg`, `--surface`, `--surface-raised`, `--text-primary`, `--text-secondary`, `--border-color`, `--accent` e `--shadow-color`. Exigir contraste WCAG AA de 4.5:1 para texto normal, 3:1 para texto grande e 3:1 para controles/bordas. Gráficos devem ter legenda textual e linhas distinguíveis. Testar persistência, modo automático e mudança de preferência do sistema.

## Regressão e documentação

Pesquisa, seleção, Open-Meteo, clima atual, previsão de 15 dias, histórico de cinco dias, detalhes horários, loading, erro e localStorage são requisitos de regressão. Atualizar README, Project Memory, guia de estudo, arquitetura e matriz de testes quando responsabilidades mudarem.
