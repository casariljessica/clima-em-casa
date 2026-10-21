# Temas e cenários meteorológicos

O seletor de tema oferece Claro, Escuro e Automático. A escolha é salva em localStorage e o modo Automático acompanha prefers-color-scheme, sem confundir tema visual com o período real da cidade.

O body recebe atributos de cenário e período a partir do código WMO e de current.is_day. Esses atributos controlam o fundo meteorológico sem bloquear cliques ou rolagem. O painel principal continua usando a animação interna, e a preferência prefers-reduced-motion desativa os movimentos.

O tema escuro usa azul-marinho, azul profundo e detalhes luminosos em vez de aplicar apenas um filtro sobre o tema claro. Os cartões, navegação, gráficos, diálogo e textos recebem cores próprias para manter contraste.
