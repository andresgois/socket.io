
# Rocketsoket

#### Aplicação de mensagem em tempo real, utilizando websocket.

## 📚 Indice
- [Funcionamento](#-funcionamento)

## Comandos
- *configurações do typescript*
- yarn tsc --init


## Funcionamento

- **Protocolo**
- CLiente  --Requisição/Aguardando--> Servidor
- **Protocolo WS/Websocket**
- CLiente  <------------ Servidor/Websocket
- CLiente  --Conectar--> Servidor/Websocket

- Para instartar o socket, ele precisa de um server http.

[Documentação Socket](https://socket.io/docs/v4/)

## Banco

### Tabelas e Propriedades
#### MongoDB
- **Entrar no container do mongo**
- docker exec -it rocketsoketbanco bash
- **Acessar o banco**
- mongo -u andre -p

##### Comandos básicos mongo
- show dbs;
- use nome-do-database-desejado 
- db.createCollection(‘myCollection’)
- db.nomedacollection.drop()

| User        | Menssages   | ChatRoom  |
|:-----------:|:-----------:|:---------:|
| email       | to: object  | idUsers   |
| socket_id   | text        | idChatRoom|
| name        | roomId      |           |
| avatar      | created_at  |           

#### Referências
- **Ajuda na construção do docker-compose**
- https://stackoverflow.com/questions/42912755/how-to-create-a-db-for-mongodb-container-on-start-up.
- **Sobre redes no docker**
- https://rafaeldalsenter.medium.com/docker-compose-nginx-aplica%C3%A7%C3%A3o-web-banco-de-dados-d8f6f33adfd2
- https://stack.desenvolvedor.expert/appendix/docker/rede.html
- **Padrões para commit**
- https://github.com/iuricode/padroes-de-commits
