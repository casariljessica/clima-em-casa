# Arquitetura

`index.html` define regiões semânticas, `css/style.css` define tokens e responsividade, e `js/script.js` coordena estado e interface. O JavaScript está organizado em seções de configurações, referências do DOM, estado, códigos WMO, auxiliares, requisições, renderização e inicialização.

O fluxo é formulário → geocodificação → latitude/longitude → consultas paralelas de previsão e histórico → validação → renderização. `getWeatherInfo` interpreta WMO e `localStorage` guarda a última localização.
