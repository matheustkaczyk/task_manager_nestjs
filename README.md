# API de gerenciamento de tarefas!

### Projeto de uma API em Nest.js que contempla criação e manipulação da empresa, usuários e tarefas.

---

## Visão Geral

##### Este desafio técnico tinha como propósito a criação de um projeto Backend de uma plataforma no estilo Trello, para o gerenciamento de tarefas.

##### Bibliotecas:

- [Nest.js](https://docs.nestjs.com/) v^9.0.0 - Framework Node;
- [TypeScript](https://www.npmjs.com/package/typescript) v^4.3.5 - Superset para Javascript;
- [dotenv](https://www.npmjs.com/package/dotenv) v^16.0.1  - Pacote para configuração de variáveis de ambiente;
- [passport](https://www.npmjs.com/package/passport) v^0.6.0 - Passport é uma middleware de autenticação para Node.js;
- [passport-jwt](https://www.npmjs.com/package/passport-jwt) v^4.0.0 - Pacote para configurar estratégia jwt para o passport;
- [mongoose](https://www.npmjs.com/package/mongoose) v^6.4.6 - Ferramente para trabalhar com banco de dados não relacionais mais fácilmente;
- [class-validator](https://www.npmjs.com/package/class-validator) v^0.13.2 - Pacote para efetuar validações de DTO's;
- [class-transformer](https://www.npmjs.com/package/class-transformer) v^0.5.1 - Pacote para instanciar e serializar objetos;

## **Sumário**

- [Pré Requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Contexto e Regras de Negócio](#contexto-e-regras-de-negócio)
- [Rotas | Endpoints](#rotas-|-endpoints)
- [Próximos passos](#próximos-passos)
- [Maiores desafios](#maiores-desafios)
- [Sobre o autor](#sobre-o-autor)

---

## **Pré requisitos**

Para rodar esse projeto é necessário ter instalado em sua máquina o runtime Node.js e todo o ambiente Docker.

---

## **Instalação**

### Utilização local

1. Você pode baixar o projeto em sua máquina utilizando o comando:

   **`git@github.com:matheustkaczyk/workmize_task_manager.git`**

2. Entre na pasta do projeto digitando o comando **`cd workmize_task_manager`**

3. Rode o container Docker do projeto digitando **`docker compose up -d`** em seu terminal (-d irá rodar em segundo plano, se você quiser ver o projeto rodando é só tirar).

4. O container docker vai configurar todo o projeto, porém, se você não quiser rodar pelo container terá de setar algumas variáveis de ambiente:
    ```
    PORT = 3000
    MONGODB_CONNSTRING = URI para a conexão com o seu mongodb
    SECRET= mysecret
    ```

### **Utilização online**

1. Foi disponibilizado uma api online onde poderá ser feito requisições de forma a não instalar nada no computador. É só fazer as requisições com os formatos descritos na seção de **ROTAS**. O link para acessar a API está logo abaixo.
   1. **`COLOCAR O LINK`**
   1. [ATENÇÃO] - Vale destacar que a **primeira requisição** do Heroku pode demorar e as vezes até falhar. Se não funcionar de primeira, por gentileza **tente cancelar e refazer** a requisição.
   2. Por enquanto só há um administrador cadastrado, segue o login: **` email: root@root.com, senha: root `**

---

## Contexto

O contexto dessa API é prover toda a lógica necessária para o frontend de uma plataforma de gerênciamento de tarefas (similar ao Trello).

## Rotas | Endpoints
### POST - Criar empresa (/company/create)
Endpoint para efetuar a criação da empresa.
```json
{
  "name": "Workmize"
}
```

### POST - Criar usuário (/user/create)
Endpoint para efetuar a criação de um usuário
```json
 {
	"name": "Matheus Tkaczyk",
	"email": "email@email.com",
	"password": "senha",
	"type": "user"
}
```

### POST - Login de usuário (/auth/login)
Endpoint para efetuar o login de um usuário
```json
{
	"email": "email@email.com",
	"password": "senha"
}
```

### GET - Pega todos os usuários (/user)
Endpoint para pegar todas as informações de usuário

### POST - Cria uma nova tarefa (/task/create)
Endpoint para criar uma nova tarefa (TOKEN NECESSÁRIO)
```json
 
```
{
	"name": "Nome tarefa 1",
	"createdBy": "Matheus Tkaczyk",
	"accountable": "Matheus Tkaczyk",
	"deliveryDate": "2022-07-28T14:07:31.202Z",
	"status": "open"
}

### GET - Busca todas as tarefas (/task)
Endpoint para buscar todas as tarefas, respeitando as permissões (TOKEN NECESSÁRIO)

### PUT - Atualiza uma tarefa criada (/task/:id)
Endpoint para atualizar as informações de uma tarefa pelo seu ID (TOKEN NECESSÁRIO)
```json
{
	"name": "Fazer tarefa 44",
	"createdBy": "Matheus Tkaczyk",
	"accountable": ["Matheus Tkaczyk"],
	"deliveryDate": "2022-07-28T14:07:31.202Z",
	"status": "finished"
}
```

### GET - Pega uma tarefa pelo seu ID (/task/:id)
Endpoint para pegar uma tarefa pelo seu ID (TOKEN NECESSÁRIO)

### DELETE - Deleta uma task pelo seu ID (/task/id)
Endpoint para deletar uma ou mais tarefas pelo seu ID (TOKEN NECESSÁRIO)
```json
{
	"id": string ou string[]
}
```

### PATCH - Atualiza o status de uma tarefa pelo seu ID (/task/id)
Endpoint para atualizar apenas o status de uma tarefa pelo seu ID (TOKEN NECESSÁRIO)
````json
{
	"id": "62dede4567da5b6fc03ecdd2",
	"status": "finished"
}
```

---

## **Próximos passos**
1. Melhorar o tratamento de erro, trazer padronização e mensagens mais nítidas.
2. Testes de integração e unitários

## **Maiores desafios**
O maior desafio foi o desejo de me desafiar e faze-lá toda em Nest.js, uma ferramenta que ainda não tenho total domínio, 
me sinto feliz de ter feito com Nest, obti uma grande confiança com a ferramenta.

---

## **Sobre o autor**

Obrigado por ter lido até aqui!

Eu me chamo Matheus, e sou desenvolvedor web fullstack. Comecei meus estudos no ano de 2020 e estou me apaixonando cada dia que passa, através dos estudos, por tecnologia e desenvolvimento. Esse projeto e esse README foram desenvolvidos como um desafio técnico. Eu empenhei muito carinho na construção de cada linha.

[Você pode olhar mais dos meus repositórios aqui](https://github.com/matheustkaczyk)

[Ou se conectar comigo no linkedin!](https://www.linkedin.com/in/matheustkaczykribeiro/)
