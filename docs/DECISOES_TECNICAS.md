# Decisões técnicas

- HTML, CSS e JavaScript puro para manter aderência à atividade.
- `Promise.all` busca previsão e histórico em paralelo.
- API Archive evita apresentar previsão passada como observação.
- Forecast solicita 16 dias e renderiza 15 para incluir hoje dentro do limite da API.
- `localStorage` é protegido por `try/catch`.
