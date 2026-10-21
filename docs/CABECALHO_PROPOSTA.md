# Cabeçalho refinado

O cabeçalho foi reorganizado em um cartão único com três níveis: identificação (saudação, data e cidade), pesquisa principal e controles secundários (aparência e atualização). A cidade selecionada é atualizada pelo mesmo fluxo de dados do painel meteorológico, sem duplicar a consulta.

O seletor segmentado usa botões nativos com `aria-pressed`, mantendo teclado, foco, persistência e os modos Claro/Escuro/Automático. O botão Atualizar do cabeçalho reutiliza o evento existente da aplicação.
