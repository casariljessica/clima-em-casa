# Project memory

O projeto possui pesquisa de cidades, clima atual, previsão de 15 dias, histórico observado de cinco dias, gráficos SVG, animações meteorológicas por código WMO e cartões de previsão interativos.

## Estado atual

- A previsão solicita variáveis diárias e horárias da Open-Meteo.
- O painel atual troca a animação conforme a condição meteorológica.
- Cada cartão futuro é focável e abre um diálogo com detalhes reais da data selecionada.
- O diálogo exibe dados horários quando disponíveis e fecha por botão, backdrop ou Escape.
- `prefers-reduced-motion` desativa as animações CSS.

## Pendências

Testes completos em navegador, leitor de tela e diferentes tamanhos de tela ainda precisam ser executados manualmente. A disponibilidade de dados horários depende da resposta da API.

## Próximos passos

Validar a seleção de cada dia no Live Server, conferir foco após o fechamento do diálogo e registrar os resultados em `REQUISITOS_E_TESTES.md`.
