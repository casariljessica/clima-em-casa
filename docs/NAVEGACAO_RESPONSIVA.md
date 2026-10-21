# Navegação responsiva

A sidebar permanece fixa no desktop e tablet, ocupa `100dvh` com fallback para `100vh` e permite rolagem interna quando necessário. A área principal recebe margem correspondente para não ficar encoberta.

No celular, a sidebar transforma-se em navegação inferior fixa, respeitando `env(safe-area-inset-bottom)` e adicionando espaço inferior ao conteúdo. Os quatro links continuam apontando para seções reais.

O JavaScript usa `IntersectionObserver` para sincronizar o item ativo com a rolagem e `aria-current="location"` para comunicar a seção atual. O clique atualiza o estado imediatamente; links e foco de teclado permanecem nativos.
