# Clima em Casa

Aplicação meteorológica educativa feita com HTML5, CSS3 e JavaScript puro. Permite pesquisar uma cidade pela geocodificação Open-Meteo e consultar condições atuais, previsão de 15 dias (inclui hoje) e histórico observado dos cinco dias completos anteriores.

## Funcionalidades

- Pesquisa e seleção de cidades com região e país.
- Painel atual com temperatura, sensação térmica, umidade, vento, precipitação e atualização.
- Animações meteorológicas selecionadas pelos códigos WMO.
- Previsão diária de 15 dias com cartões clicáveis.
- Diálogo acessível com detalhes diários e dados horários reais.
- Gráficos SVG de temperatura e precipitação, sem dependências.
- Histórico via API Archive, estados de carregamento, erros, atualização manual e localStorage.
- Interface responsiva com navegação por teclado e suporte a prefers-reduced-motion.

## Executar

Abra a pasta no VS Code e rode um servidor HTTP local, como Live Server. Também é possível executar python -m http.server na pasta e abrir http://localhost:8000. Não é necessário instalar dependências ou backend.

## Estrutura

index.html contém o dashboard, navegação e diálogo; css/style.css contém o tema, responsividade e animações; js/script.js concentra API, estado, filtragem horária, renderização e interações; docs/ contém a documentação técnica.

## APIs e créditos

São usadas a Geocoding API, Forecast API e Archive API da Open-Meteo. A Forecast API fornece dados diários e horários; a Archive API fornece o histórico observado. A disponibilidade dos dados depende da cobertura da API.

Mais detalhes estão em docs/ANIMACOES_E_DETALHES.md.
# Calendário lunar

A seção de tendências também apresenta um calendário das fases principais da Lua, alimentado pela API pública do U.S. Naval Observatory e convertido para o fuso horário da cidade pesquisada. Consulte [docs/LUA_FASES.md](docs/LUA_FASES.md) para conhecer a fonte, a precisão e as limitações dos dados.
