# Refinamento de UX: controles e gráficos

O seletor de tema foi convertido de dropdown para grupo de botões segmentado nativo. Cada opção usa `aria-pressed`, mantém foco visível e continua persistindo Claro, Escuro ou Automático em `localStorage`.

O cabeçalho mantém identificação e busca como áreas principais, enquanto o tema fica agrupado como controle secundário. A faixa resumida ganhou botões de navegação anterior/próximo, mantendo rolagem por toque e trackpad. A previsão completa de 15 dias não foi alterada.

A seção de gráficos usa Grid responsivo em duas colunas proporcionais no desktop e uma coluna no mobile. Os dados continuam sendo os valores reais já recebidos da Open-Meteo.
