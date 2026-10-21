# Animações meteorológicas e previsão interativa

O painel atual recebe uma classe baseada no código WMO: sol, parcialmente nublado, nublado, chuva, tempestade, neve ou neblina. Cada classe controla partículas, nuvens, brilho, relâmpago ou camadas de neblina com CSS. A regra `prefers-reduced-motion` desativa as animações para respeitar a preferência do sistema.

Os cartões da previsão são elementos focáveis e interativos. O diálogo usa os dados `daily` para resumo e filtra o objeto `hourly` pela data local retornada pela API. O gráfico horário representa somente temperaturas horárias disponíveis; quando a API não oferece registros, o painel informa a indisponibilidade.
