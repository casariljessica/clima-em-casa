# Guia de estudo

HTML organiza o dashboard, a navegação lateral, os cartões e o diálogo acessível. CSS usa Grid, Flexbox, variáveis, media queries e animações com `prefers-reduced-motion`.

## Dados horários

O JavaScript solicita `hourly` à Open-Meteo. A função `getHourlyIndexesForDate` filtra os registros cujo texto de data corresponde ao dia selecionado. Assim, o detalhe usa medições horárias reais e não transforma a máxima diária em medição de horário.

## Interação

Os cartões recebem `tabindex="0"`, `role="button"` e listeners para clique, Enter e Espaço. `openDayDetails` registra o cartão de origem, preenche o diálogo e move o foco para o botão de fechar. `closeDayDetails` fecha o modal, remove o destaque e devolve o foco ao cartão.

## Animações

`getWeatherAnimationClass` agrupa os códigos WMO em sol, parcialmente nublado, nublado, chuva, tempestade, neve e neblina. `renderWeatherAnimation` troca a classe do painel atual. Os elementos são CSS simples e não dependem de bibliotecas.
