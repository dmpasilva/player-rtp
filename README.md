# Player RTP para LG WebOS

Este repositório contém um protótipo para uma aplicação cliente do RTP Play não oficial que usa
um servidor [RTP Player API](https://github.com/dmpasilva/rtp-player-api).

**Esta aplicação não se encontra pronta para ser usada num ambiente de produção!**

## Funcionalidades:

Esta aplicação não oficial do RTP Play suporta as seguintes funcionalidades:

- [x] Lista de categorias VOD
- [x] Lista parcial de programas de TV VOD
- [x] Lista de episódios de programa de TV VOD
- [x] Reprodução de programa de TV VOD
- [x] Avançar e recuar em programa de TV VOD
- [ ] Lista de programas de TV VOD por categoria
- [ ] Suporte a programas de TV com várias partes
- [ ] Legendas
- [ ] Publicidade
- [ ] Detalhes do programa de TV e dos episódios
- [ ] Programas de rádio
- [ ] Programas de rádio por categoria
- [ ] Reprodução de programas de rádio
- [ ] Reprodução de programas de rádio por partes
- [ ] Detalhes do programa de rádio e dos episódios
- [ ] Paginação
- [ ] Pesquisa por texto
- [ ] Emissões em direto de TV
- [ ] Emissões em direto de Rádio


## Requisitos

São necessárias as seguintes aplicações instaladas no computador:

- Angular CLI
- WebOS SDK
- [RTP Player API](https://github.com/dmpasilva/rtp-player-api)

Antes de iniciar o processo de desenvolvimento, é necessário substituir o URL
do servidor da RTP Player API nos ficheiros `environments/environment.ts` e 
`environments/environment.prod.ts`.

## Instruções de compilação

A aplicação pode ser iniciada em modo de desenvolvimento e testada localmente no computador executando:

```
npm start
```

Para compilar a aplicação para modo de TV, são necessários os seguintes passos:

1. Compilar a aplicação em modo de produção:

  ```
  ng build --prod
  ```

2. Empacotar a aplicação para o formato de aplicações LG:

  ```
  cd dist
  ares-package --no-minif .
  ```

3. Enviar a aplicação compilada para a TV:

  ```
  ares-install --device tv ./pt.davidsilva.webos.player_0.0.1_all.ipk
  ares-inspect --device tv --app pt.davidsilva.webos.player --open
  ```


## Aviso legal

Esta é uma aplicação não oficial desenvolvida por programadores independentes. 

Esta aplicação não é fornecida, suportada ou apoiada pela RTP ou qualquer empresa do grupo RTP.

Esta aplicação poderá não produzir os resultados esperados pelo utilizador, uma vez que a qualquer momento a RTP poderá modificar o design do site ou criar mecanismos de bloqueio ao funcionamento desta aplicação.
