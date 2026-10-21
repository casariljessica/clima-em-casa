# Calendário de fases da Lua

## Fonte dos dados

O calendário lunar utiliza a API pública do **U.S. Naval Observatory (USNO)**:

`https://aa.usno.navy.mil/api/moon/phases/date`

A resposta fornece as ocorrências das quatro fases principais — Lua nova, quarto crescente, Lua cheia e quarto minguante — com data e horário em UTC. A aplicação solicita um intervalo que inclui uma ocorrência anterior e as próximas ocorrências para calcular a fase atual e permitir a seleção de cada fase.

## Fuso horário

O fuso retornado pela Open-Meteo para a cidade pesquisada é usado para formatar as datas no navegador em português brasileiro. O horário recebido do USNO continua sendo interpretado como UTC antes da conversão. Assim, a troca de cidade atualiza também a apresentação local das fases.

## Precisão e limitações

- O USNO é uma fonte astronômica oficial, adequada para as datas das fases principais.
- A ilustração representa a fase principal selecionada; ela não pretende simular a geometria exata da iluminação em todos os dias do ciclo.
- A porcentagem é exibida apenas quando pode ser determinada sem estimativa: 0% para Lua nova e 100% para Lua cheia. Para os quartos, o card mostra `—` em vez de inventar uma precisão.
- Se a API estiver indisponível, o card exibe “Dados indisponíveis” e não interrompe a previsão meteorológica.

## Acessibilidade e interação

As quatro fases são controles `button` nativos, com foco visível, suporte a teclado e estado selecionado. A ilustração SVG é decorativa e recebe uma descrição textual pelo conteúdo do card.

## Responsividade

O calendário ocupa a terceira coluna do grid de tendências em telas amplas, passa para uma nova linha em larguras intermediárias e ocupa uma coluna própria no celular. O comportamento respeita os temas claro e escuro e desativa o brilho animado quando `prefers-reduced-motion: reduce` está ativo.
