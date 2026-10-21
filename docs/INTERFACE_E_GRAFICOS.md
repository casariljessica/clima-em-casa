# Interface e gráficos

## Atualização visual

A interface recebeu uma identidade visual inspirada no céu, com tons de azul, gradientes discretos, cartões arredondados, sombras suaves e estados de foco visíveis. O primeiro cartão da previsão recebe a classe `today-card` e é identificado como “Hoje”. Os cartões do histórico usam cores quentes e bordas próprias para não serem confundidos com previsões.

Também foram adicionados efeitos de hover discretos e uma regra `prefers-reduced-motion` para respeitar usuários que preferem menos movimento. A estrutura HTML e a integração com a Open-Meteo permanecem inalteradas.

## Gráficos

Os gráficos de temperatura e precipitação foram adiados para uma segunda etapa. Como o projeto não utiliza dependências, uma implementação com SVG ou canvas aumentaria a complexidade antes da validação do painel principal. Essa decisão pode ser revisitada sem alterar as consultas atuais, pois os dados diários já estão disponíveis no objeto recebido da API.
