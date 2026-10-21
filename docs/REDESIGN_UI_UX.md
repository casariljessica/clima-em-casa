# Clima em Casa — especificação de redesign UI/UX

**Status:** proposta para aprovação. Esta etapa não altera os arquivos da aplicação.

## 1. Direção visual

A imagem de referência fornecida define a direção principal: dashboard meteorológico com navegação lateral compacta, área central de leitura rápida e painel de clima dominante, com cartões claros, ilustração expressiva e hierarquia de dados. A implementação deve preservar os dados reais da Open-Meteo, mas substituir a sensação de “página com cartões” por uma composição de produto.

### Referências consultadas

1. [Weather Dashboard UI — Drashti Goswami, Dribbble](https://dribbble.com/shots/27199960-Weather-Dashboard-UI)

   Referência de hierarquia por camadas: clima atual e temperatura aparecem primeiro, enquanto vento, umidade, UV e visibilidade ficam em cartões de apoio. Aproveitar a ideia de leitura em níveis, agrupamento por contexto e uso de cartões para reduzir a carga cognitiva.

2. [Weather Dashboard UI/UX Design — Kayes Ahamed Hridoy, Dribbble](https://dribbble.com/shots/26766566-Weather-Dashboard-UI-UX-Design)

   Referência de dashboard escuro com visualização de dados, estados de alerta e contraste forte. Aproveitar o tratamento de dark mode como identidade própria, a separação entre métricas e a preferência por gráficos simples com poucos elementos visuais.

3. [Weather app — dashboard design — Roland Richard Toth, Behance](https://www.behance.net/gallery/193698207/Weather-app-dashboard-design)

   Referência de fluxo completo de produto: pesquisa de localização, painel principal e experiência mobile. Aproveitar o campo de busca como ação primária, a organização de previsão diária e a adaptação da composição para telas pequenas.

### Limitações da pesquisa

A Figma Community foi consultada por busca, mas as páginas da comunidade ficaram bloqueadas por robots.txt nesta sessão. Não há arquivo Figma conectado nem frames acessíveis para extrair medidas. Portanto, as medidas abaixo são uma especificação própria baseada na imagem fornecida e nas referências web efetivamente abertas.

## 2. Layout proposto

### Desktop — 1440 px

- Canvas: `1440 × 900 px`, fundo `#eef3ff` no tema claro.
- Sidebar: `88 px` fixa, com ícones de 44 px e tooltip/nome acessível. Expandir para `220 px` apenas se houver modo explícito de menu aberto.
- Conteúdo: `calc(100vw - 88px)`, padding horizontal de `40 px`, largura máxima de `1320 px`.
- Grid principal: `minmax(0, 1fr) 360 px`, gap de `24 px`.
- Área central: cabeçalho de `72 px`, previsão resumida em faixa de `168 px`, cartões complementares em grid de 3 colunas, gráfico de temperatura em card de altura aproximada de `240 px`.
- Painel direito: largura entre `320–380 px`, altura mínima de `560 px`, borda arredondada de `28 px`. A ilustração ocupa `220–260 px` no topo; temperatura, condição e métricas descem verticalmente.
- Previsão completa: seção inferior em 5 colunas no desktop, com rolagem interna apenas se a largura real não comportar os cartões.

Composição:

```text
┌──────┬──────────────────────────────────────────────┬──────────────┐
│ side │ saudação + busca                            │              │
│ bar  ├──────────────────────────────────────────────┤ painel atual │
│      │ resumo 5–7 dias                              │ vertical     │
│      ├───────────────────────┬──────────────────────┤              │
│      │ métricas coloridas    │ gráfico              │              │
│      ├───────────────────────┴──────────────────────┤              │
│      │ previsão completa / histórico                │              │
└──────┴──────────────────────────────────────────────┴──────────────┘
```

### Tablet — 768 px

- Sidebar compacta de `72 px`, somente ícones, com áreas de toque mínimas de `44 px`.
- Grid de uma coluna: painel atual vem após a previsão resumida e antes dos gráficos.
- Cartões complementares em 2 colunas.
- Previsão resumida em faixa horizontal com rolagem por toque e indicação visual discreta de continuidade.
- Previsão completa em 3 colunas ou lista vertical, conforme a largura disponível.

### Mobile — 390 px

- Sidebar substituída por navegação inferior fixa de `64–72 px`, com quatro itens: visão geral, previsão, histórico e informações.
- Conteúdo com padding horizontal de `16 px`; nenhum componente deve gerar overflow horizontal fora de faixas explicitamente roláveis.
- Cabeçalho empilhado: saudação, data, seletor de tema e busca.
- Painel atual vertical com ilustração de `150–180 px`, temperatura grande e métricas em 2 colunas.
- Resumo diário em faixa horizontal rolável; o primeiro cartão deve indicar “Hoje”.
- Detalhes por horário abrem como bottom sheet com altura máxima de `86vh`, alça visual, botão fechar e gesto/tecla Escape.

## 3. Design system

### Tokens

```css
:root {
  --page-bg: #eef3ff;
  --surface: #ffffff;
  --surface-raised: #f7f9ff;
  --text-primary: #24344f;
  --text-secondary: #7787a3;
  --border-color: #dfe7f5;
  --accent: #3975e8;
  --accent-soft: #dce8ff;
  --pink-soft: #ffe8f1;
  --orange-soft: #fff0df;
  --lavender-soft: #ebe9ff;
  --shadow-color: rgb(42 75 135 / 12%);
}
```

Dark mode deve redefinir os mesmos tokens, não aplicar filtro:

```css
[data-theme="dark"] {
  --page-bg: #0d1729;
  --surface: #172640;
  --surface-raised: #203555;
  --text-primary: #edf4ff;
  --text-secondary: #adbed8;
  --border-color: #2d456c;
  --accent: #82aaff;
  --accent-soft: #263f69;
  --shadow-color: rgb(0 0 0 / 28%);
}
```

- Tipografia: `Plus Jakarta Sans` para títulos e números; `DM Sans` para textos e controles.
- Escala: 12 px metadata, 14 px corpo auxiliar, 16 px corpo, 24 px títulos de seção, 64–92 px temperatura principal.
- Raio: 12 px controles, 18 px cartões menores, 28 px painéis principais.
- Espaçamento: base de 8 px; usar 16, 24, 32 e 40 px como intervalos principais.
- Contraste: texto primário deve atingir pelo menos WCAG AA contra `--surface`; texto secundário não deve ser usado para informação essencial sem reforço visual.

## 4. Plano de frames

### Frame `Dashboard / Desktop / 1440`

- Estado padrão claro, cidade selecionada, clima atual disponível.
- Sidebar expandida visualmente por ícones e tooltips.
- Resumo com 7 dias, painel atual vertical à direita, métricas e gráfico.
- Área inferior com previsão completa e histórico.

### Frame `Dashboard / Tablet / 768`

- Sidebar compacta.
- Painel atual ocupando largura total após o resumo.
- Dois cartões de métricas por linha.
- Faixa de previsão com scroll por toque.

### Frame `Dashboard / Mobile / 390`

- Navegação inferior fixa.
- Busca em largura total.
- Painel atual vertical e bottom sheet de detalhes.
- Cartões com toque confortável, sem texto comprimido.

### Variantes de estado

- `Theme / Light`, `Theme / Dark`, `Theme / Auto`.
- `Weather / Sunny`, `Weather / Rain`, `Weather / Storm`, `Weather / Cloudy`, `Weather / Snow`, `Weather / Fog`, `Weather / Night`.
- `Data / Loading`, `Data / Error`, `Data / Empty search`, `Data / Historical unavailable`.
- `Forecast / Today selected`, `Forecast / Future day selected`.

## 5. Estados e cenários

### Claro

Fundo azul-lavanda, superfícies brancas, painel principal azul, cartões complementares rosa/laranja/lavanda e texto azul-marinho.

### Escuro

Fundo azul-marinho, superfícies azul-profundo, bordas azuis dessaturadas, texto claro e accent luminoso. Nenhum texto claro deve ser colocado sobre superfície clara.

### Automático

Persistir `auto` e reagir a `prefers-color-scheme`, sem confundir o tema escolhido com `current.is_day` da cidade.

### Loading

Manter a composição estável; usar skeletons suaves nos cartões e spinner discreto no status. Não substituir toda a página por uma tela vazia.

### Erro

Alert persistente, curto e acionável. Preservar a última leitura válida quando possível e oferecer Atualizar/Pesquisar novamente.

### Clima

Ilustração SVG grande com camadas próprias para sol, nuvens, chuva, tempestade, neve, neblina e lua. A animação deve ser lenta, com `pointer-events: none`, e desligar em `prefers-reduced-motion`.

## 6. Interações

### Pesquisa de cidades

1. Usuário digita e envia.
2. Mostrar loading no status.
3. Listar até 10 resultados com cidade, região e país.
4. Seleção por clique ou teclado.
5. Atualizar cenário, painel atual, resumo e previsões sem recarregar.

### Seleção de dia

Cada cartão futuro tem `tabindex="0"`, `role="button"`, foco visível e responde a Enter/Espaço. O estado selecionado recebe borda/accent, e o painel de detalhes mostra a data correspondente.

### Detalhes por horário

Filtrar `hourly.time` pelo prefixo da data local retornada pela API. Renderizar somente os registros disponíveis: temperatura, sensação, chuva, vento, direção e umidade. O gráfico deve informar unidade e horários legíveis; ausência de dados deve ser explícita.

### Resumo inteligente

Gerar frases determinísticas apenas quando houver evidência: “Possibilidade de chuva à tarde” quando a probabilidade da tarde superar um limiar definido e houver dados; “Temperaturas mais baixas pela manhã” quando a série horária demonstrar essa tendência. Nunca inferir dados ausentes.

### Tema e navegação

O seletor Claro/Escuro/Automático salva a preferência e atualiza tokens. A sidebar desktop e a navegação inferior mobile usam âncoras reais e estado ativo; foco e tamanho de toque devem permanecer acessíveis.

## 7. Ilustrações SVG

Criar um componente SVG ou funções geradoras com `viewBox="0 0 320 240"`:

- Sol: círculo com gradiente amarelo/laranja, halo e raios em grupo separado.
- Parcial: sol atrás de duas nuvens com profundidade e `transform` lento.
- Nublado: duas ou três nuvens sobrepostas em tons frios.
- Chuva: nuvens densas e duas camadas de gotas com velocidades diferentes.
- Tempestade: nuvens escuras, chuva e relâmpago com opacidade baixa.
- Neve: flocos em tamanhos e velocidades variadas.
- Neblina: três paths/faixas translúcidas com deslocamento horizontal.
- Noite: lua, poucas estrelas e nuvens dessaturadas.

O SVG deve ser decorativo (`aria-hidden="true"`), enquanto a descrição textual continua no HTML. Não usar emoji como ilustração principal.

## 8. Critérios verificáveis de UX e acessibilidade

- Em `1440 × 900`, a composição deve ser claramente `sidebar | centro | painel direito`; o painel direito não pode cair abaixo da previsão.
- Em `390 × 844`, não pode haver overflow horizontal global; somente as faixas explicitamente roláveis podem ter scroll.
- Todos os elementos interativos são alcançáveis por teclado e têm foco visível.
- Áreas de toque mobile têm pelo menos `44 × 44 px`.
- O modal/bottom sheet devolve foco ao cartão ao fechar e fecha com Escape.
- Tema claro, escuro e automático permanecem legíveis; verificar contraste de texto, cartões e gráficos.
- A preferência de movimento reduzido elimina animações não essenciais.
- Pesquisa vazia, cidade inexistente, erro HTTP, falha de rede e histórico indisponível têm mensagens compreensíveis.
- A previsão mantém 15 dias e o histórico mantém 5 dias completos.
- Dados horários são associados à data local da cidade e nunca são inventados a partir de máximas/mínimas diárias.
- A diferença visual para a imagem B é estrutural: painel vertical, cards distribuídos e navegação responsiva.

## 9. Plano de implementação após aprovação

1. Consolidar tokens semânticos e remover regras CSS conflitantes.
2. Reestruturar HTML em sidebar, área central e painel direito.
3. Separar resumo de 5–7 dias e previsão completa de 15 dias.
4. Criar ilustrações SVG meteorológicas e camada de cenário.
5. Implementar bottom navigation e bottom sheet mobile.
6. Consolidar dark mode e estados de carregamento/erro.
7. Implementar resumo inteligente baseado em dados horários.
8. Validar em 1440×900, 768×1024 e 390×844, atualizando a matriz de testes.
