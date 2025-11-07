# DC Dark Metal — SuperHero API (Front-end)

Este projeto é um front-end temático **DC (dark)** que consome dados da **SuperHero API** para exibir personagens em cards horizontais.

## Importante — obter o ACCESS_TOKEN
A SuperHero API **exige um access token gratuito**. Para obter:

1. Acesse: https://superheroapi.com/  
2. Clique em "Get access token" ou em "Try now" (pode pedir login via GitHub).  
3. Siga o procedimento — você receberá um token (ex: 123456789012345).



3. Abra `index.html` no navegador. A página fará requisições ao endpoint:
```
https://superheroapi.com/api/SEU_TOKEN/search/{nome}
```

> Obs: a API pode aplicar limitações de requisições e CORS. Se ocorrer erro de CORS, hospede o site (GitHub Pages / Netlify) para evitar problemas locais.


## Créditos
- API: https://superheroapi.com/  
- Design: inspirado no layout da Rick and Morty API (tema dark e cards horizontais).  

🔗 https://cors-anywhere.herokuapp.com/corsdemo
