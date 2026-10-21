# Redesign estrutural do dashboard

O dashboard foi reorganizado em Grid para desktop: sidebar à esquerda, área central com previsão resumida, cartões complementares e gráficos, e painel de clima atual vertical à direita. O painel atual não é mais uma faixa horizontal da área central.

A seção de tendências (`.charts-section`) atravessa toda a largura útil do dashboard abaixo do painel superior. Seus três cartões usam três colunas equivalentes no desktop: temperaturas, precipitação diária e calendário lunar. Em larguras intermediárias, os dois gráficos ficam na primeira linha e o calendário lunar ocupa a linha seguinte; no celular, os cartões são empilhados.

A previsão resumida mostra sete dias; a previsão completa mantém os quinze dias em `fullForecastGrid`. O histórico continua em uma seção própria. Em telas menores, o Grid se transforma em fluxo vertical e a navegação usa o comportamento compacto já definido pelos breakpoints.

O painel atual usa a camada `.weather-animation` como ilustração meteorológica principal. O emoji permanece apenas como fallback semântico, mas é ocultado visualmente no painel grande. As camadas têm `pointer-events: none`, não bloqueiam interação e respeitam `prefers-reduced-motion`.
