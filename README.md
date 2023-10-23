# FoodExplorer Back-end aaaa

Para acessar o projeto no ar, clique aqui [AQUI](https://food-explorer-front-end.netlify.app/) ou visite o repositório [Front-end](https://github.com/HenricoAngolera/food_explorer_frontend)

Este é projeto é o back-end do desafio final do Explorer da Rocketseat, ele consiste em um e-comerce de restaurante figurativo. E usei as seguintes tecnologias:

## Stack utilizada

**Back-end:** NodeJS, express.js, bcryptjs, cors, dotenv, knex, multer, sqlite

**Ferramentas:** Insomnia, beekeeper

## Usuários Cadastrados

Para acessar o sistema como usuário administrador, você pode usar as seguintes credenciais no login:

- email: admin@email.com
- senha: 123456

Você pode cadastrar um novo usuário comum, ou usar um já cadastrado:

- email: henrico@email.com
- senha: 123456

Você pode acessar o projeto front-end online: [https://food-explorer-front-end.netlify.app/](https://food-explorer-front-end.netlify.app/) , ou rodar localmente, informações de como executar o front-end em [Front-end](https://github.com/HenricoAngolera/food_explorer_frontend)
.

## Como utilizar:

O back-end em produção está neste link: [https://foodexplorer-api-tfpp.onrender.com](https://foodexplorer-api-tfpp.onrender.com)

Para criar um banco de dados local localmente, siga os seguintes passos:

Primeiramente, você precisa ter instalado Git e NodeJS para executar este projeto.

Com tudo instalado, você pode clonar este projeto, rodando no teminal com a pasta da sua preferência:

```bash
    git clone https://github.com/HenricoAngolera/food_explorer_backend.git

    # ou

    git clone git@github.com:HenricoAngolera/food_explorer_backend.git
```

Com o projeto clonado, você entra na pasta que foi criada após esse processo:

```bash
    cd food_explorer_backend
```

Para instalar os pacotes da pasta node_modules, rodar o seguinte comando:

```bash
    npm install
```

Então, podar o seguinte comando para iniciar o projeto:

```bash
    npm run dev
```

E então, em outro terminal você pode rodar o comando para gerar as tabelas no banco de dados:

```bash
    npm run migrate
```

Caso você queira editar informações como o segredo do token ou a porta do projeto, você pode criar seu arquivo `.env` seguindo o arquivo `.env.example` e inserir suas informações desejadas.

## Relacionados

Segue o projeto front-end desta aplicação:

[FoodExplorer Front-end](https://github.com/HenricoAngolera/food_explorer_frontend)

## Considerações finais

Estes projetos, tanto o back-end quanto o front-end representam muito do que aprendi nos últimos tempos, fiquei muito satisfeito com minha evolução, mas vou evoluir ainda mais! Este projeto será melhorado ao longo do tempo, obrigado por ler até aqui! 

## Feedback

Se você tiver algum feedback, por favor me deixe saber por meio de henrico.an@gmail.com
